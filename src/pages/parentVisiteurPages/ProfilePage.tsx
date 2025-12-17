import { Switch } from "@headlessui/react";
import { FiEdit2 } from "react-icons/fi";
import CVCart from "../../features/components/ui/CVCart";
import { childrenStore } from "../../features/store/children.store";
import { userService } from "../../services/user.service";
import { useEffect, useState } from "react";
import { childService } from "../../services/child.service";
import { userStore } from "../../features/store/user.store";
import ParentPlanning from "../../features/components/ParentPlanning";
import { getMondayBeforeDate } from "../../utils/planningFunction";

export default function PageProfile() {
  const { user } = userStore();
  const [profilPublic, setProfilPublic] = useState(false);

  const today = new Date();
  const currentMonday = getMondayBeforeDate(today);

  const {
    children,
    selectedChild,
    setChildren,
    selectChild,
  } = childrenStore();

  // 🔐 Si pas de user encore chargé
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E6E6FA]">
        <p className="text-gray-700 text-lg">Chargement du profil...</p>
      </div>
    );
  }

  // 🔎 Récupérer les infos utilisateur
  const {
    data: userData,
    isLoading: userLoading,
    isError: userIsError,
    error: userError,
  } = userService.getById(user.id);

  // 🔎 Récupérer les enfants si parent
  const {
    data: childrenData,
    isLoading: childrenIsLoading,
    isError: childrenIsError,
    error: childrenError,
  } = childService.getChildByParent(user.id);

  // Met à jour le store des enfants quand la requête réussit
  useEffect(() => {
    if (childrenData) {
      setChildren(childrenData);
      // si aucun enfant sélectionné, on prend le premier
      if (!selectedChild && childrenData.length > 0) {
        selectChild(childrenData[0].id);
      }
    }
  }, [childrenData, setChildren, selectedChild, selectChild]);

  // enfant courant à afficher
  const childToShow =
    children.find((c) => c.id === selectedChild) || children[0] || null;

  // Gestion des chargements / erreurs globales
  if (userLoading || (userData?.role === "PARENT" && childrenIsLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E6E6FA]">
        <p className="text-gray-700 text-lg">Chargement des données...</p>
      </div>
    );
  }

  if (userIsError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E6E6FA]">
        <p className="text-red-500">
          Erreur lors du chargement de l'utilisateur :{" "}
          {userError instanceof Error ? userError.message : "Erreur inconnue"}
        </p>
      </div>
    );
  }

  if (userData?.role === "PARENT" && childrenIsError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E6E6FA]">
        <p className="text-red-500">
          Erreur lors du chargement des enfants :{" "}
          {childrenError instanceof Error
            ? childrenError.message
            : "Erreur inconnue"}
        </p>
      </div>
    );
  }

  return (
    <div className="pt-32 bg-[#E6E6FA] min-h-screen flex flex-col items-center px-4">
      <div className="w-full max-w-5xl flex flex-col gap-8">
        <h3 className="text-3xl font-semibold text-gray-900 mb-6">
          Mon profil
        </h3>

        {/* PROFIL */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-4 w-full min-h-[350px]">
          {/* titre + switch + crayon */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="font-medium text-gray-700">Profil public</span>
              <Switch
                checked={profilPublic}
                onChange={setProfilPublic}
                className={`${
                  profilPublic ? "bg-green-500" : "bg-gray-300"
                } relative inline-flex h-6 w-11 items-center rounded-full transition`}
              >
                <span
                  className={`${
                    profilPublic ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>

            <button className="flex items-center text-orange-500 hover:text-orange-700 transition">
              <FiEdit2 className="text-xl" />
            </button>
          </div>

          {/* photo + infos user */}
          <div className="flex items-center mt-4 gap-6">
            <div className="flex-shrink-0">
              <img
                src={userData?.photo || "/default-avatar.png"}
                alt="Photo de profil"
                className="w-24 h-24 rounded-full object-cover border-2 border-orange-500"
              />
            </div>

            {/* infos user */}
            <div className="flex flex-col text-gray-700">
              <span className="font-semibold text-lg">
                {userData?.username}
              </span>
              <span className="text-sm">{userData?.email}</span>
              <span className="text-sm">{userData?.city}</span>
            </div>
          </div>
        </div>

        {/* CV ou ParentDashboard */}
        {userData?.role === "PARENT" ? (
          <>
            {/* Sélecteur d'enfant si plusieurs */}
            {children.length > 1 && (
              <div className="mb-4 flex gap-2">
                {children.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => selectChild(child.id)}
                    className={`px-4 py-2 rounded-xl font-medium transition ${
                      childToShow && childToShow.id === child.id
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {child.firstName}
                  </button>
                ))}
              </div>
            )}

            {/* Affichage du planning pour l’enfant sélectionné */}
            {childToShow ? (
              <ParentPlanning monday={currentMonday} childName={childToShow.firstName} classId={childToShow.classId}/>
            ) : (
              <p className="text-gray-500">Aucun enfant trouvé</p>
            )}
          </>
        ) : (
          <CVCart visitor />
        )}
      </div>
    </div>
  );
}
