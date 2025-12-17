import { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { FaPen } from "react-icons/fa";

import PlanningModal from "./ModalPlanning";
import PlanningModalEdit from "./ModalPlanningEdit";

import { roomService } from "../../services/room.service";
import { categoryService } from "../../services/category.service";
import { classStore } from "../store/class.store";
import { planningActivityService } from "../../services/planningActivity.service";
import { EMoment } from "../types/planningActivity";

interface PlanningProps {
  monday: Date;
}

type UIMoment = "Matin" | "Midi" | "Soir";
type ModalMoment = "MATIN" | "MIDI" | "SOIR";

export default function Planning({ monday }: PlanningProps) {
  const { cls } = classStore();
  const classId = cls?.id ?? null;

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

  const momentToModalLabel: Record<UIMoment, ModalMoment> = {
    Matin: "MATIN",
    Midi: "MIDI",
    Soir: "SOIR",
  };

  // salles / matériel
  const { data: rooms } = roomService.getRooms();
  const { data: materials } = categoryService.getAllCategory();

  // planning
  const {
    data: planActivities = [],
    isLoading: isPlanningLoading,
    error: planningError,
    refetch: refetchPlanning,
  } = planningActivityService.getByClassAndWeek(classId, monday);

  type CellType = (typeof planActivities)[number];

  // map (day-moment) → cellule
  const cellMap = useMemo(() => {
    const map = new Map<string, CellType>();
    planActivities.forEach((pa) => {
      const key = `${pa.day}-${pa.moment}`;
      map.set(key, pa);
    });
    return map;
  }, [planActivities]);

  // états modales
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedModalMoment, setSelectedModalMoment] =
    useState<ModalMoment | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedMomentEnum, setSelectedMomentEnum] = useState<EMoment | null>(
    null
  );
  const [selectedActivity, setSelectedActivity] = useState<CellType | null>(
    null
  );

  if (!classId) {
    return (
      <p className="text-center text-gray-500">
        Aucune classe sélectionnée. Veuillez choisir une classe pour voir le
        planning.
      </p>
    );
  }

  if (isPlanningLoading) return <p>Chargement du planning...</p>;
  if (planningError) return <p>Erreur lors du chargement du planning</p>;

  // factorisation jour/moment
  const prepareSelection = (jour: string, moment: UIMoment) => {
    const dayIndex = dayToIndex[jour];
    setSelectedDay(dayIndex);

    const date = new Date(monday);
    date.setDate(monday.getDate() + (dayIndex - 1));
    setSelectedDate(date);

    const momentEnum = momentToEnum[moment];
    setSelectedMomentEnum(momentEnum);

    const modalMoment = momentToModalLabel[moment];
    setSelectedModalMoment(modalMoment);
  };

  // modale création
  const handleOpenCreateModal = (jour: string, moment: UIMoment) => {
    prepareSelection(jour, moment);
    setSelectedActivity(null);
    setOpenCreateModal(true);
  };
  const handleCloseCreateModal = () => setOpenCreateModal(false);

  // modale édition
  const handleOpenEditModal = (
    jour: string,
    moment: UIMoment,
    cell: CellType
  ) => {
    prepareSelection(jour, moment);
    setSelectedActivity(cell);
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => setOpenEditModal(false);

  const handleSave = () => {
    refetchPlanning();
    setOpenCreateModal(false);
    setOpenEditModal(false);
  };

  // util pour récupérer les infos d'une case
  const getCellInfo = (jour: string, moment: UIMoment) => {
    const dayIndex = dayToIndex[jour];
    const momentEnum = momentToEnum[moment];
    const key = `${dayIndex}-${momentEnum}`;
    const cell = cellMap.get(key) || null;

    const activityName = cell?.activity?.name ?? cell?.outing?.name ?? null;
    const roomName = cell?.activity?.room?.name ?? null;
    const isValidated = Boolean(cell?.validatedAt);

    return { cell, activityName, roomName, isValidated };
  };

  // Rendu d’une cellule (commun desktop + mobile inversé)
  const renderCell = (jour: string, moment: UIMoment) => {
    const { cell, activityName, roomName, isValidated } = getCellInfo(
      jour,
      moment
    );

    if (!activityName) {
      return (
        <td
        data-cy={`planning-add-${jour}-${moment}`}
          key={`${jour}-${moment}`}
          className="p-3 border border-gray-400"
        >
          <button
            onClick={() => handleOpenCreateModal(jour, moment)}
            className="flex items-center justify-center mx-auto bg-orange-500 hover:bg-orange-700 text-white rounded-full p-2 shadow-md transition"
          >
            <FiPlus className="w-5 h-5" aria-label="Ajouter une activité" />
          </button>
        </td>
      );
    }

    return (
      <td
        key={`${jour}-${moment}`}
        className={`relative p-3 border border-gray-400 ${
          isValidated ? "bg-green-100" : ""
        }`}
      >
        {!isValidated && cell && (
          <button
            onClick={() => handleOpenEditModal(jour, moment, cell)}
            className="absolute top-1 right-1 text-orange-500 hover:text-orange-700 transition p-1"
          >
            <FaPen className="lg:w-5 lg:h-5 md:w-3 md:h-3 sm:w-1 sm:h-1" aria-label="Modifier" />
          </button>
        )}

        <div className="flex flex-col items-center sm:text-sm text-xl text-gray-800 font-medium">
          <span>{activityName}</span>
          {roomName && (
            <span className="text-md sm:text-sm text-gray-500 mt-1">
              {roomName}
            </span>
          )}
        </div>
      </td>
    );
  };

  return (
    <>
      {/* DESKTOP */}
      <div className="p-4 w-full overflow-x-auto hidden md:block">
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
                  {jours.map((jour) => renderCell(jour, moment))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE – tableau inversé comme PlanningAdmin */}
      <div className="w-full overflow-x-auto block md:hidden">
        <div className="rounded-xl overflow-hidden shadow-xl">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr>
                <th className="p-3 bg-gray-100 text-gray-800">
                  Jours / Moments
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
                  {/* Jour raccourci : LU, MA, ME, etc. */}
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

      {/* Modale création */}
      {openCreateModal &&
        rooms &&
        materials &&
        selectedDate &&
        selectedMomentEnum &&
        selectedModalMoment &&
        selectedDay !== null && (
          <PlanningModal
            open={openCreateModal}
            onClose={handleCloseCreateModal}
            onSave={handleSave}
            dayLabel={jours[selectedDay - 1]}
            dayNumber={selectedDay}
            moment={selectedModalMoment}
            date={selectedDate}
            momentEnum={selectedMomentEnum}
            room={rooms}
            material={materials}
            classId={classId}
          />
        )}

      {/* Modale édition */}
      {openEditModal &&
        rooms &&
        materials &&
        selectedDate &&
        selectedMomentEnum &&
        selectedModalMoment &&
        selectedDay !== null &&
        selectedActivity &&
        selectedActivity.activity && (
          <PlanningModalEdit
            open={openEditModal}
            onClose={handleCloseEditModal}
            onSave={handleSave}
            dayLabel={jours[selectedDay - 1]}
            dayNumber={selectedDay}
            moment={selectedModalMoment}
            date={selectedDate}
            momentEnum={selectedMomentEnum}
            room={rooms}
            material={materials}
            activityId={selectedActivity.activity.id}
            planningId={selectedActivity.planningId}
            initialName={selectedActivity.activity.name}
            initialRoomId={
              (selectedActivity.activity as any).roomId ??
              selectedActivity.activity.room?.id ??
              ""
            }
            initialCategoryMaterialId={
              (selectedActivity.activity as any).categoryMaterialId ?? ""
            }
            initialContent={(selectedActivity.activity as any).content ?? ""}
          />
        )}
    </>
  );
}
