// src/features/components/ModalPlanningAdmin.tsx

import { Dialog } from "@headlessui/react";
import { FiCheck, FiTrash2, FiX } from "react-icons/fi";

interface PlanningModalAdminProps {
  open: boolean;
  onClose: () => void;

  dayLabel: string;         // ex: "Mardi"
  date: Date;               // date cliquée
  momentLabel: string;      // "Matin" / "Midi" / "Soir"

  activityName: string;
  roomName?: string | null;
  materialName?: string | null;

  isValidated: boolean;

  onValidate: () => void;
  onDelete: () => void;
}

export default function PlanningModalAdmin(props: PlanningModalAdminProps) {
  const {
    open,
    onClose,
    dayLabel,
    date,
    momentLabel,
    activityName,
    roomName,
    materialName,
    isValidated,
    onValidate,
    onDelete,
  } = props;

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      {/* overlay */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {dayLabel}{" "}
              {date.toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
              })}{" "}
              — {momentLabel}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <FiX className="text-gray-500" />
            </button>
          </div>

          {/* CONTENU */}
          <div className="space-y-2 mb-6">
            <p className="text-gray-700">
              Activité :{" "}
              <span className="font-semibold">{activityName}</span>
            </p>

            {roomName && (
              <p className="text-gray-700">
                Salle : <span className="font-medium">{roomName}</span>
              </p>
            )}

            {materialName && (
              <p className="text-gray-700">
                Matériel :{" "}
                <span className="font-medium">{materialName}</span>
              </p>
            )}

            {isValidated && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mt-2">
                <FiCheck />
                Déjà validée
              </div>
            )}
          </div>

          {/* BOUTONS */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition"
            >
              <FiTrash2 />
              Supprimer
            </button>
            <button
              type="button"
              onClick={onValidate}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
            >
              <FiCheck />
              Valider
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
