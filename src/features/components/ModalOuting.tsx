import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import ButtonAdd from "./buttons/ButtonAdd";
import { categoryService } from "../../services/category.service";
import { useFormik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

interface OutingModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    outingName: string;
    location: string;
    materialCategory?: string;
    content:string
  }) => void;
}

const modalValidationSchema = Yup.object().shape({
  outingName: Yup.string().required("Le nom de l'activité est obligatoire."),
  location: Yup.string().required("La localisation de l'activité est obligatoire."),
  categoryMaterialId: Yup.string().optional(),
  content: Yup.string().optional(),
});

export default function OutingModal({
  open,
  onClose,
  onSave,
}: OutingModalProps) {

  const [outingName, setOutingName] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [content, setContent] = useState("");

 const [materialCategories, setMaterialCategories] = useState<string[]>([]);

  // Appel à l'API pour récupérer les catégories
 const { data:categoryData } = categoryService.getAllCategory();
useEffect(() => {
  if (categoryData) {
    setMaterialCategories(categoryData.map(category => category.name));
  }
}, [categoryData]);



  const handleSubmit = () => {
    if (!outingName) return;

    onSave({
      outingName,
      location,
      materialCategory: selectedCategory,
      content: "", 
    });

    setOutingName("");
    setLocation("");
    setSelectedCategory("");
    setContent("")
    onClose();
  };;

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">

      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Sortie à proposer ?
          </h3>

          {/* Contenu principal */}
          <div className="flex flex-col gap-4">
            {/* Nom activité */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Nom de l'activité
              </label>
              <input
                value={outingName}
                onChange={(e) => setOutingName(e.target.value)}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-gray-700"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Localisation
              </label>

              
                <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-gray-700"
              />
                  
              
            </div>

            {/* Matériel */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Matériel nécessaire
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                <option value="">-- Sélectionne une catégorie de matériaux --</option>
                {materialCategories.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Description
              </label>
              <input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Boutons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
            >
              Annuler
            </button>
            <ButtonAdd text="Ajouter une sortie" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </Dialog>
  );
}
