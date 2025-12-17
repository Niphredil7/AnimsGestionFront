import { useMemo } from "react";
import { FiCheck } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { classStore } from "../store/class.store";
import { planningActivityService } from "../../services/planningActivity.service";
import { EMoment } from "../types/planningActivity";
import toast from "react-hot-toast";

interface PlanningProps {
  monday: Date;
  classId?: string | null;
}

type UIMoment = "Matin" | "Midi" | "Soir";

export default function PlanningAdmin({ monday, classId }: PlanningProps) {
  const { cls } = classStore();
  const effectiveClassId = classId ?? cls?.id ?? null;

  const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
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

  const {
    data: planActivities = [],
    isLoading,
    error,
    refetch,
  } = planningActivityService.getByClassAndWeek(effectiveClassId, monday);

  const validateMutation = planningActivityService.validateActivity();
  const deleteMutation = planningActivityService.deleteActivity();

  const cellMap = useMemo(() => {
    const map = new Map<string, (typeof planActivities)[number]>();
    planActivities.forEach((pa) => {
      const key = `${pa.day}-${pa.moment}`;
      map.set(key, pa);
    });
    return map;
  }, [planActivities]);

  if (!effectiveClassId) {
    return (
      <p className="text-center text-gray-500">
        Aucune classe sélectionnée. Veuillez choisir un animateur / une classe.
      </p>
    );
  }

  if (isLoading) return <p>Chargement du planning...</p>;
  if (error) return <p>Erreur lors du chargement du planning</p>;

 // toutes les cellules remplies avec des activité
  const allMidisFilled = days.every((day) => {
    const dayIndex = dayToIndex[day];
    const key = `${dayIndex}-${EMoment.NOON}`;
    const cell = cellMap.get(key);

    return Boolean(cell && (cell.activity || cell.outing));
  });

  // Toast validation
  const handleValidateCell = (id: string) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="text-gray-800 font-medium">
          Valider cette activité ?
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 rounded bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
          >
            Non
          </button>

          <button
            onClick={() => {
              validateMutation.mutate(id, {
                onSuccess: () => {
                  toast.success("Activité validée !");
                  refetch();
                  toast.dismiss(t.id);
                },
                onError: () => {
                  toast.error("Erreur lors de la validation");
                },
              });
            }}
            className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600 transition"
          >
            Oui
          </button>
        </div>
      </div>
    ));
  };

  // Toast suppression
  const handleDeleteCell = (id: string) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="text-gray-800 font-medium">
          Supprimer cette activité ?
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 rounded bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
          >
            Non
          </button>

          <button
            onClick={() => {
              deleteMutation.mutate(id, {
                onSuccess: () => {
                  toast.success("Activité supprimée !");
                  refetch();
                  toast.dismiss(t.id);
                },
                onError: () => {
                  toast.error("Erreur lors de la suppression");
                },
              });
            }}
            className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
          >
            Oui
          </button>
        </div>
      </div>
    ));
  };

   // validation de TOUT le planning (seulement si allCellsFilled === true)
  const handleValidateAll = () => {
    const idsToValidate = planActivities
      .filter((pa) => !pa.validatedAt)
      .map((pa) => pa.id);

    if (idsToValidate.length === 0) {
      toast.success(
        "Toutes les activités de cette semaine sont déjà validées."
      );
      return;
    }

    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="text-gray-800 font-medium">
          Valider tout le planning de cette semaine ?
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 rounded bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
          >
            Non
          </button>

          <button
            onClick={async () => {
              try {
                await Promise.all(
                  idsToValidate.map((id) => validateMutation.mutateAsync(id))
                );
                toast.success("Planning entièrement validé !");
                refetch();
                toast.dismiss(t.id);
              } catch {
                toast.error("Erreur lors de la validation du planning");
              }
            }}
            className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600 transition"
          >
            Oui
          </button>
        </div>
      </div>
    ));
  };

  const renderCell = (jour: string, moment: UIMoment) => {
  const dayIndex = dayToIndex[jour];
  const momentEnum = momentToEnum[moment];
  const key = `${dayIndex}-${momentEnum}`;
  const cell = cellMap.get(key);

  const activityName =
    cell?.activity?.name ?? cell?.outing?.name ?? null;
  const roomName = cell?.activity?.room?.name ?? null;
  const materialName =
    (cell?.activity as any)?.categoryMaterial?.name ?? null;

  const isValidated = Boolean(cell?.validatedAt);

  if (!activityName) {
    return (
      <td
        key={`${jour}-${moment}`}
        className="p-3 border border-gray-400 text-sm text-gray-400"
      >
        —
      </td>
    );
  }

  return (
    <td
      key={`${jour}-${moment}`}
      className="relative border border-gray-400 px-3 py-2"
    >
      {/* ICONES VALIDATION / SUPPRESSION  */}
      {!isValidated && (
        <>
          <button
            onClick={() => handleValidateCell(cell!.id)}
            className="absolute top-0 left-0 p-0.5 bg-green-100 hover:bg-green-200"
          >
            <FiCheck className="text-green-600 text-md" aria-label="Validate" />
          </button>
          <button
            onClick={() => handleDeleteCell(cell!.id)}
            className="absolute bottom-0 right-0 p-0.5 bg-red-100 hover:bg-red-200"
          >
            <RxCross2 className="text-red-600 text-md" aria-label="Delete" />
          </button>
        </>
      )}

      {/* CONTENU */}
      <div className="w-full h-full flex flex-col items-center justify-center text-gray-800 font-medium">
        <div className="flex items-center gap-2">
          <span className="text-lg md:text-xl">{activityName}</span>
          {isValidated && (
            <FiCheck className="text-green-500 text-md" aria-label="Validated" />
          )}
        </div>
        {roomName && (
          <span className="text-sm md:text-md text-gray-500 mt-1">
            {roomName}
          </span>
        )}
        {materialName && (
          <span className="text-xs md:text-sm text-gray-400">
            {materialName}
          </span>
        )}
      </div>
    </td>
  );
};

  return (
    <>
    {/* BOUTON DE VALIDATION GLOBALE */}
     {allMidisFilled && (
        <div className="flex justify-start mb-2 ml-5">
          <button
            type="button"
            onClick={handleValidateAll}
            className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm md:text-base hover:bg-green-800 transition"
          >
            Valider le planning entier
          </button>
        </div>
     )}
      {/* DESKTOP */}
      <div className="p-4 w-full overflow-x-auto hidden md:block">
        <div className="rounded-xl overflow-hidden shadow-xl">
          <table className="shadow-xl w-full min-w-max text-center">
            <thead>
              <tr>
                <th className="p-3 bg-gray-100 text-gray-800">
                  Moment / Jour
                </th>
                {days.map((day) => (
                  <th key={day} className="p-3 bg-orange-500 text-white">
                    {day}
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
                  {days.map((day) => renderCell(day, moment))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

            {/* MOBILE – même structure que le planning ANIM */}
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
              {days.map((day) => (
                <tr key={day} className="border-t">
                  {/* Jour raccourci : LU, MA, ME, etc. */}
                  <td className="p-3 font-semibold bg-orange-500 text-white">
                    {day.slice(0, 2)}
                  </td>

                  {/* on réutilise le rendu desktop (avec +, crayon, bg vert si validé, etc.) */}
                  {moments.map((moment) => renderCell(day, moment))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </>
  );
}
