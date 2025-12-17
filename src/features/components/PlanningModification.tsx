// ... imports identiques

import { useMemo, useState } from "react";
import { categoryService } from "../../services/category.service";
import { planningActivityService } from "../../services/planningActivity.service";
import { roomService } from "../../services/room.service";
import { classStore } from "../store/class.store";
import { FiPlus } from "react-icons/fi";
import PlanningModal from "./ModalPlanning";

interface PlanningProps {
  monday: Date; // lundi de la semaine affichée
}

export default function Planning({ monday }: PlanningProps) {
  const { cls } = classStore();
  const classId = cls?.id ?? null;

  const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
  const moments = ["Matin", "Midi", "Soir"];

  const dayToIndex: Record<string, number> = {
    Lundi: 1,
    Mardi: 2,
    Mercredi: 3,
    Jeudi: 4,
    Vendredi: 5,
  };

  const momentToEnum: Record<string, "MORNING" | "NOON" | "EVENING"> = {
    Matin: "MORNING",
    Midi: "NOON",
    Soir: "EVENING",
  };

  const { data: rooms } = roomService.getRooms();
  const { data: materials } = categoryService.getAllCategory();

  const {
    data: planActivities = [],
    isLoading: isPlanningLoading,
    error: planningError,
    refetch: refetchPlanning,
  } = planningActivityService.getByClassAndWeek(classId, monday);

  const cellMap = useMemo(() => {
    const map = new Map<string, (typeof planActivities)[number]>();
    planActivities.forEach((pa) => {
      const key = `${pa.day}-${pa.moment}`;
      map.set(key, pa);
    });
    return map;
  }, [planActivities]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedMoment, setSelectedMoment] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedMomentEnum, setSelectedMomentEnum] = useState<
    "MORNING" | "NOON" | "EVENING" | null
  >(null);

  // 🔹 nouvelle state : activité de planning sélectionnée (pour édition)
  const [selectedPlanningActivity, setSelectedPlanningActivity] =
    useState<(typeof planActivities)[number] | null>(null);

  const handleOpenModal = (
    jour: string,
    moment: string,
    cell?: (typeof planActivities)[number] | null,
  ) => {
    setSelectedDay(jour);
    setSelectedMoment(moment);

    const dayIndex = dayToIndex[jour];
    const date = new Date(monday);
    const offset = (dayIndex ?? 1) - 1;
    date.setDate(monday.getDate() + offset);
    setSelectedDate(date);

    const momentEnum = momentToEnum[moment];
    setSelectedMomentEnum(momentEnum);

    setSelectedPlanningActivity(cell ?? null); // 👈 null = création, sinon édition

    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPlanningActivity(null);
  };

  const handleSave = (data: {
    activityName: string;
    room?: string;
    material?: string;
    content?: string;
    date: Date;
    momentEnum: "MORNING" | "NOON" | "EVENING";
  }) => {
    // console.log("activité créée / modifiée pour le planning :", {
    //   jour: selectedDay,
    //   moment: selectedMoment,
    //   ...data,
    // });

    // après création / édition réussie côté back, tu pourras :
    // refetchPlanning();

    setOpenModal(false);
    setSelectedPlanningActivity(null);
  };

  if (isPlanningLoading) {
    return <p>Chargement du planning...</p>;
  }
  if (planningError) {
    return <p>Erreur lors du chargement du planning</p>;
  }

  return (
    <>
      {/* DESKTOP */}
      <div className="p-4 w-full overflow-x-auto hidden md:block ">
        <div className="rounded-xl overflow-hidden shadow-xl">
          <table className="shadow-xl w-full min-w-max text-center">
            <thead>
              <tr>
                <th className="p-3 bg-gray-100 text-gray-800">
                  Moment / Jour
                </th>
                {jours.map((jour) => (
                  <th key={jour} className="p-3 bg-orange-500 text-white">
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

                  {jours.map((jour) => {
                    const dayIndex = dayToIndex[jour];
                    const momentEnum = momentToEnum[moment];
                    const key = `${dayIndex}-${momentEnum}`;
                    const cell = cellMap.get(key);

                    const activityName =
                      cell?.activity?.name ?? cell?.outing?.name ?? null;
                    const roomName = cell?.activity?.room?.name ?? null;

                    const hasContent = !!activityName;

                    return (
                      <td
                        key={`${jour}-${moment}`}
                        className="p-3 border border-gray-400"
                      >
                        {hasContent ? (
                          // 🔹 case cliquable pour EDIT
                          <button
                            type="button"
                            onClick={() =>
                              handleOpenModal(jour, moment, cell ?? null)
                            }
                            className="w-full flex flex-col items-center text-sm text-gray-800 font-medium hover:bg-gray-100 rounded-lg px-1 py-1"
                          >
                            <span>{activityName}</span>
                            {roomName && (
                              <span className="text-xs text-gray-500 mt-1">
                                Salle {roomName}
                              </span>
                            )}
                          </button>
                        ) : (
                          // 🔹 case vide : bouton +
                          <button
                            onClick={() => handleOpenModal(jour, moment, null)}
                            className="flex items-center justify-center mx-auto bg-orange-500 hover:bg-orange-700 text-white rounded-full p-2 shadow-md transition"
                          >
                            <FiPlus className="w-5 h-5" />
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE — même logique, juste layout différent */}
      <div className="w-full overflow-x-auto block md:hidden">
        <div className="rounded-xl overflow-hidden shadow-xl">
          <table className="w-full min-w-max text-center border-collapse">
            <thead>
              <tr>
                <th className="p-3 bg-orange-500 text-white">
                  Jour / Moment
                </th>
                {moments.map((moment) => (
                  <th key={moment} className="p-3 bg-[#3C3344] text-white">
                    {moment}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {jours.map((jour) => (
                <tr key={jour} className="border-t">
                  <td className="p-3 font-semibold bg-orange-500 text-white">
                    {jour}
                  </td>

                  {moments.map((moment) => {
                    const dayIndex = dayToIndex[jour];
                    const momentEnum = momentToEnum[moment];
                    const key = `${dayIndex}-${momentEnum}`;
                    const cell = cellMap.get(key);

                    const activityName =
                      cell?.activity?.name ?? cell?.outing?.name ?? null;
                    const roomName = cell?.activity?.room?.name ?? null;

                    const hasContent = !!activityName;

                    return (
                      <td
                        key={`${jour}-${moment}`}
                        className="p-3 border border-gray-400"
                      >
                        {hasContent ? (
                          <button
                            type="button"
                            onClick={() =>
                              handleOpenModal(jour, moment, cell ?? null)
                            }
                            className="w-full flex flex-col items-center text-sm text-gray-800 font-medium hover:bg-gray-100 rounded-lg px-1 py-1"
                          >
                            <span>{activityName}</span>
                            {roomName && (
                              <span className="text-xs text-gray-500 mt-1">
                                Salle {roomName}
                              </span>
                            )}
                          </button>
                        ) : (
                          <button
                            onClick={() => handleOpenModal(jour, moment, null)}
                            className="flex items-center justify-center mx-auto bg-orange-500 hover:bg-orange-700 text-white rounded-full p-2 shadow-md transition"
                          >
                            <FiPlus className="w-5 h-5" />
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {openModal &&
          rooms &&
          materials &&
          selectedDate &&
          selectedMomentEnum && (
            <PlanningModal
              open={openModal}
              onClose={handleCloseModal}
              onSave={handleSave}
              day={selectedDay || ""}
              moment={(selectedMoment as "Matin" | "Midi" | "Soir") || "Matin"}
              date={selectedDate}
              momentEnum={selectedMomentEnum}
              room={rooms}
              material={materials}
              // 🔹 nouveau : on passe l'activité si on est en mode EDIT
              mode={selectedPlanningActivity ? "edit" : "create"}
              planningActivity={selectedPlanningActivity}
            />
          )}
      </div>
    </>
  );
}
