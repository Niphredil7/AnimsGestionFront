import { Dialog } from "@headlessui/react";
import ButtonAdd from "./buttons/ButtonAdd";
import type { CategoryMaterial } from "../types/material.type";
import type { Room } from "../types/room.type";
import type { IActivityUpdateData } from "../../utils/activityData.type";
import { userStore } from "../store/user.store";
import { useFormik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { activityService } from "../../services/activity.service";
import type { EMoment } from "../types/planningActivity";


interface PlanningModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;

  dayLabel: string;
  dayNumber: number; // dispo si tu en as besoin plus tard
  moment: "MATIN" | "MIDI" | "SOIR";
  date: Date;
  momentEnum: EMoment;

  room: Room[];
  material: CategoryMaterial[];

  //InitialValues
  activityId: string;
  planningId: string;
  initialName: string;
  initialRoomId: string;
  initialCategoryMaterialId?: string;
  initialContent?: string;
}

type ActivityFormValues = {
  name: string;
  roomId: string;
  categoryMaterialId: string;
  content: string;
};

const modalValidationSchema = Yup.object().shape({
  name: Yup.string().required("Le nom de l'activité est obligatoire."),
  roomId: Yup.string().required("La salle de l'activité est obligatoire."),
  categoryMaterialId: Yup.string().optional(),
  content: Yup.string().optional(),
});

export default function PlanningModalEdit(props: PlanningModalProps) {
  const {
   open,
    onClose,
    onSave,
    dayLabel,
    moment,
    date,
    room,
    material,
    activityId,
    planningId,
    initialName,
    initialRoomId,
    initialCategoryMaterialId,
    initialContent,
  } = props;

  const { user } = userStore();


 const activityMutation = activityService.updateActivity(activityId)


  const formik = useFormik<ActivityFormValues>({
    initialValues: {
      name: initialName ?? "",
      roomId: initialRoomId ?? "",
      categoryMaterialId: initialCategoryMaterialId ?? "",
      content: initialContent ?? "",
    },
    enableReinitialize: true,
    validationSchema: modalValidationSchema,
    onSubmit: (
      values: ActivityFormValues,
      helpers: FormikHelpers<ActivityFormValues>
    ) => {
      const { setSubmitting, resetForm } = helpers;

      if (!user || activityMutation.isPending) {
        toast.loading("Veuillez patienter.");
        setSubmitting(false);
        return;
      }

      const payload: IActivityUpdateData = {
          name: values.name,
          content: values.content || undefined,
          favorite: "IsNotFavorite",
          userId: user.id,
          roomId: values.roomId,
          categoryMaterialId: values.categoryMaterialId || undefined,
          validatedAt: undefined, 
          planningId,
      };
       activityMutation.mutate(payload, {
          onSuccess: () => {
              toast.success("Activité modifiée");
          resetForm();
          onSave();  
          onClose();
        },
          onError: (err: any) => {
            console.error(
              "Erreur lors de la modification de l'activité :",
              err?.response?.data || err
            );
            const msg =
              err?.response?.data?.message ||
              "Erreur lors de la modification de l'activité";
            toast.error(msg);
          },
          onSettled: () => {
            setSubmitting(false);
          },
        }
      );
    },
  });

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            {dayLabel} {date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })} — {moment}
          </h3>
          <div className="flex flex-col gap-4">
            {/* Nom activité */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Nom de l'activité
              </label>
              <input
              role="actvity-name"
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-gray-700"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-sm text-orange-500">
                  {formik.errors.name}
                </p>
              )}
            </div>

            {/* Salle */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Salle
              </label>
              <select
                name="roomId"
                value={formik.values.roomId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full text-gray-800 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                <option value="">-- Sélectionne une salle --</option>
                {room?.map((r: Room) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
              {formik.touched.roomId && formik.errors.roomId && (
                <p className="text-sm text-orange-500">
                  {formik.errors.roomId}
                </p>
              )}
            </div>

            {/* Matériel */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Matériel nécessaire
              </label>
              <select
                name="categoryMaterialId"
                value={formik.values.categoryMaterialId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full text-gray-800 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                <option value="">-- Sélectionne un matériel --</option>
                {material?.map((m: CategoryMaterial) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Description
              </label>
              <input
                type="text"
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-gray-700"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
            >
              Annuler
            </button>
            <ButtonAdd
              text={formik.isSubmitting ? "En cours..." : "Ajouter"}
              type="submit"
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
}
