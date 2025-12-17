import { useState } from "react";
import { Link } from "react-router-dom";
import PlanningAdmin from "../../features/components/PlanningAdmin";
import { addWeeks, getMondayBeforeDate } from "../../utils/planningFunction";
import { userStore } from "../../features/store/user.store";
import { userService } from "../../services/user.service";
import { classService } from "../../services/class.service";
import { ChevronLeftIcon } from "../../components/ChevronLeftIcon";

export default function PlanningsAdminPage() {
  const today = new Date();
  const currentMonday = getMondayBeforeDate(today);

  const weekOne = addWeeks(currentMonday, 1);
  const weekTwo = addWeeks(currentMonday, 2);
  const weekThree = addWeeks(currentMonday, 3);
  const weekFour = addWeeks(currentMonday, 4);

  const { user } = userStore();
  const schoolId = user?.schoolId ?? null;

  const {
    data: animators = [],
    isLoading: usersLoading,
    error: usersError,
  } = userService.getAllUsersBySchool(schoolId);

  const [selectedAnimatorId, setSelectedAnimatorId] = useState<string>("");

  const {
    data: animatorClass,
    isLoading: classLoading,
    error: classError,
  } = classService.getClassByUser(selectedAnimatorId);

  const selectedClassId = animatorClass?.id ?? null;

  return (
    <main className="min-h-screen pt-24 bg-white">
      {/* Bouton retour */}
      <div className="max-w-5xl mx-auto px-5">
        <Link to="/admin" aria-label="Back">
          <ChevronLeftIcon aria-label="Back" size={48} className="text-orange-500 hover:text-orange-800 w-10 h-10" />
        </Link>
      </div>

      {/* Conteneur principal */}
      <div className="max-w-5xl mx-auto flex flex-col gap-10 px-5">
        <div className="flex justify-between items-center">
          <h1 className="lg:text-4xl md:text-xl font-semibold text-gray-900 mb-4">
            Plannings
          </h1>
          <h1 className="lg:text-4xl md:text-xl text-gray-900">
            {animatorClass
              ? `Classe de ${animatorClass.name}`
              : "Aucune classe sélectionnée"}
          </h1>
        </div>

        {/* Sélecteur d’animateur */}
        <div className="mt-2">
          <label className="block text-gray-700 font-medium mb-1">
            Animateurs
          </label>

          {usersLoading && (
            <p className="text-sm text-gray-500">
              Chargement des animateurs...
            </p>
          )}
          {usersError && (
            <p className="text-sm text-orange-500">
              Erreur lors du chargement des animateurs.
            </p>
          )}

          {animators && (
            <select
              value={selectedAnimatorId}
              onChange={(e) => setSelectedAnimatorId(e.target.value)}
              className="w-full text-gray-800 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="Sélectionne un animateur">-- Sélectionne un animateur --</option>
              {animators.map((anim) => (
                <option key={anim.id} value={anim.id}>
                  {anim.username}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* États intermédiaires */}
        {!selectedAnimatorId && (
          <p className="text-center text-gray-500">
            Sélectionnez un animateur pour afficher ses plannings.
          </p>
        )}

        {selectedAnimatorId && classLoading && (
          <p className="text-center text-gray-500">
            Chargement de la classe de l’animateur...
          </p>
        )}

        {selectedAnimatorId && classError && (
          <p className="text-center text-orange-500">
            Erreur lors du chargement de la classe de cet animateur.
          </p>
        )}

        {selectedAnimatorId && !classLoading && !classError && !selectedClassId && (
          <p className="text-center text-gray-500">
            Cet animateur n’a pas encore de classe associée.
          </p>
        )}

        {/* Plannings des 4 prochaines semaines */}
        {selectedAnimatorId && selectedClassId && (
          <>
            {/* Semaine +1 */}
            <h3 className="text-2xl text-gray-900 text-center font-semibold mb-4">
              Semaine du{" "}
              <span className="font-bold">
                {weekOne.toLocaleDateString("fr-FR")}
              </span>
            </h3>
            <PlanningAdmin monday={weekOne} classId={selectedClassId} />

            {/* Semaine +2 */}
            <h3 className="text-2xl text-gray-900 text-center font-semibold mb-4">
              Semaine du{" "}
              <span className="font-bold">
                {weekTwo.toLocaleDateString("fr-FR")}
              </span>
            </h3>
            <PlanningAdmin monday={weekTwo} classId={selectedClassId} />

            {/* Semaine +3 */}
            <h3 className="text-2xl text-gray-900 text-center font-semibold mb-4">
              Semaine du{" "}
              <span className="font-bold">
                {weekThree.toLocaleDateString("fr-FR")}
              </span>
            </h3>
            <PlanningAdmin monday={weekThree} classId={selectedClassId} />

            {/* Semaine +4 */}
            <h3 className="text-2xl text-gray-900 text-center font-semibold mb-4">
              Semaine du{" "}
              <span className="font-bold">
                {weekFour.toLocaleDateString("fr-FR")}
              </span>
            </h3>
            <PlanningAdmin monday={weekFour} classId={selectedClassId} />
          </>
        )}
      </div>
    </main>
  );
}
