// src/pages/parent/ParentPlanning.tsx
import { useMemo, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { planningActivityService } from "../../services/planningActivity.service";
import { EMoment } from "../../features/types/planningActivity";
import { userStore } from "../store/user.store";

interface ParentPlanningProps {
  childName: string;
  monday: Date;
  classId: string;
}

type UIMoment = "Matin" | "Midi" | "Soir";

export default function ParentPlanning({
  childName,
  monday,
  classId,
}: ParentPlanningProps) {
  const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
  const moments: UIMoment[] = ["Matin", "Midi", "Soir"];

  const dayToIndex: Record<string, number> = {
    Lundi: 1,
    Mardi: 2,
    Mercredi: 3,
    Jeudi: 4,
    Vendredi: 5,
  };

  const momentToEnum: Record<UIMoment, EMoment> = {
    Matin: EMoment.MORNING,
    Midi: EMoment.NOON,
    Soir: EMoment.EVENING,
  };

  // Récupération du planning de la CLASSE de l'enfant pour la semaine
  const {user} = userStore()
  
  const {
    data: planActivities = [],
    isLoading,
    error,
  } = planningActivityService.getByClassAndWeek(classId, monday);

  type CellType = (typeof planActivities)[number];

  // Map (day-moment) → cellule
  const cellMap = useMemo(() => {
    const map = new Map<string, CellType>();
    planActivities.forEach((pa) => {
      const key = `${pa.day}-${pa.moment}`;
      map.set(key, pa);
    });
    return map;
  }, [planActivities]);


  if (!classId) {
    return (
      <p className="text-center text-gray-500 mt-4">
        Aucune classe associée à cet enfant.
      </p>
    );
  }

  if (isLoading) {
    return (
      <p className="text-center text-gray-500 mt-4">
        Chargement du planning de la classe...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-4">
        Erreur lors du chargement du planning.
      </p>
    );
  }

  // Récupération des infos d'une case (comme dans Planning)
  const getCellInfo = (jour: string, moment: UIMoment) => {
    const dayIndex = dayToIndex[jour];
    const momentEnum = momentToEnum[moment];
    const key = `${dayIndex}-${momentEnum}`;
    const cell = cellMap.get(key) || null;

    const activityName = cell?.activity?.name ?? cell?.outing?.name ?? null;
    const roomName = cell?.activity?.room?.name ?? null;
    const activityId = cell?.activity?.id ?? cell?.outing?.id ?? null;

    return { cell, activityName, roomName, activityId };
  };

  // Rendu d'une cellule pour parent : activité + cœur favori
  const renderCell = (jour: string, moment: UIMoment) => {
    const { activityName, roomName, activityId } = getCellInfo(jour, moment);

    if (!activityName) {
      // Pas d’activité : on laisse la case vide (ou avec un tiret)
      return (
        <td
          key={`${jour}-${moment}`}
          className="p-3 border border-gray-400 align-middle"
        >
          <span className="text-gray-300 text-sm">—</span>
        </td>
      );
    }

    const isFavorite = activityId ? favorites.has(activityId) : false;

    return (
      <td
        key={`${jour}-${moment}`}
        className="relative p-3 border border-gray-400 align-middle"
      >
        {activityId && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              //toggleFavorite(activityId);
              // TODO: ici tu pourras appeler un service pour sauvegarder le favori côté back
              // ex: feedbackService.markFavorite({ activityId, childId, monday })
            }}
            className="absolute top-1 right-1 p-1"
          >
            <FaHeart
              className={`w-5 h-5 ${
                isFavorite ? "text-red-500" : "text-gray-300"
              }`}
              aria-label="Mettre en favori"
            />
          </button>
        )}

        <div className="flex flex-col items-center sm:text-sm text-base text-gray-800 font-medium">
          <span>{activityName}</span>
          {roomName && (
            <span className="text-xs text-gray-500 mt-1">{roomName}</span>
          )}
        </div>
      </td>
    );
  };

  return (
    <>
      <div className="w-full flex flex-col items-center mt-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
          Planning de la semaine de {childName}
        </h2>
      </div>

      {/* DESKTOP – même structure que Planning admin */}
      <div className="p-4 w-full overflow-x-auto hidden md:block">
        <div className="rounded-xl overflow-hidden shadow-xl bg-white">
          <table className="shadow-xl w-full min-w-max text-center">
            <thead>
              <tr>
                <th className="p-3 bg-gray-100 text-gray-800">
                  Moment / Jour
                </th>
                {jours.map((jour) => (
                  <th
                    key={jour}
                    className="p-3 bg-orange-500 text-white font-semibold"
                  >
                    {jour}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {moments.map((moment) => (
                <tr key={moment} className="border-t">
                  <td className="p-3 font-semibold bg-[#3C3344] text-white">
                    {moment}
                  </td>
                  {jours.map((jour) => renderCell(jour, moment))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE – même inversion que Planning admin */}
      <div className="w-full overflow-x-auto block md:hidden">
        <div className="rounded-xl overflow-hidden shadow-xl bg-white">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr>
                <th className="p-3 bg-gray-100 text-gray-800">
                  Jours / Moments
                </th>
                {moments.map((moment) => (
                  <th
                    key={moment}
                    className="p-3 bg-[#3C3344] text-white font-semibold"
                  >
                    {moment}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {jours.map((jour) => (
                <tr key={jour} className="border-t">
                  <td className="p-3 font-semibold bg-orange-500 text-white">
                    {jour.slice(0, 2)}
                  </td>
                  {moments.map((moment) => renderCell(jour, moment))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
