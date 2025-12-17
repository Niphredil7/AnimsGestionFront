import { useState } from "react";
import GenderChart from "../../features/components/Chart";
import ActivityFeedback from "../../features/components/Feedback";
import PlanningAdmin from "../../features/components/PlanningAdmin";
import { classService } from "../../services/class.service";
import { feedbackService } from "../../services/feedback.service";
import { getMondayBeforeDate } from "../../utils/planningFunction";
import { userService } from "../../services/user.service";
import { userStore } from "../../features/store/user.store";

export default function AdminDashboardPage() {
  const today = new Date();
  const currentMonday = getMondayBeforeDate(today);

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

  const {
    data: feedbacksData,
    isLoading: feedbackLoading,
    error: feedbackError,
  } = feedbackService.getAllFeedback();

  return (
    <div className="min-h-screen pt-32 bg-white">
      <div className="max-w-5xl mx-auto flex flex-col gap-10 px-5">
        <div className="flex justify-between items-center">
          <h1 className="lg:text-4xl md:text-xl font-semibold text-gray-900 mb-4">
            Dashboard
          </h1>
          <h1 className="lg:text-4xl md:text-xl text-gray-900">
            {animatorClass
              ? `Classe de ${animatorClass.name}`
              : "Aucune classe sélectionnée"}
          </h1>
        </div>

        {/* Graphique */}
        <GenderChart />

        {/* SELECT ANIMATEUR */}
        <div className="mt-4">
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
              aria-label="Select user"
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

          {classLoading && selectedAnimatorId && (
            <p className="text-sm text-gray-500 mt-1">
              Chargement de la classe de l'animateur...
            </p>
          )}
          {classError && selectedAnimatorId && (
            <p className="text-sm text-orange-500 mt-1">
              Impossible de récupérer la classe de cet animateur.
            </p>
          )}
        </div>

        {/* Planning de la classe sélectionnée */}
        <h3 className="text-2xl text-gray-900 text-center font-semibold mb-4">
          Semaine du{" "}
          <span className="font-bold">
            {currentMonday.toLocaleDateString("fr-FR")}
          </span>
        </h3>

        <PlanningAdmin monday={currentMonday} classId={selectedClassId} />
      </div>

      {/* Feedbacks */}
      <div className="max-w-5xl mx-auto px-5 mt-10">
        {feedbackLoading && <p>Chargement des feedbacks...</p>}
        {feedbackError && <p>Erreur lors du chargement des feedbacks</p>}

        {feedbacksData && feedbacksData.length > 0 && (
          <ActivityFeedback activities={feedbacksData} />
        )}
      </div>
    </div>
  );
}
