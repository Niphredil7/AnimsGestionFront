import { useEffect } from "react";
import GenderChart from "../../features/components/Chart";
import ActivityFeedback from "../../features/components/Feedback";
import Planning from "../../features/components/Planning";
import { classService } from "../../services/class.service";
import { feedbackService } from "../../services/feedback.service";
import { getMondayBeforeDate } from "../../utils/planningFunction";
import { classStore } from "../../features/store/class.store";


export default function AnimDashboardPage() {

const today = new Date();
  const currentMonday = getMondayBeforeDate(today);

  const { setClass } = classStore()

const {
    data: feedbacksData,
    isLoading: feedbackLoading,
    error : feedbackError,
  } = feedbackService.getAllFeedback();

  const { data: classData, isLoading:classLoading, error:classError} = classService.getMyClass();

  useEffect(() => {
    if (classData) {
      setClass(classData);
    }
  }, [classData, setClass])


  return (
    <main className="min-h-screen pt-32 bg-white">
      {/* Conteneur centré commun */}
      <div className="max-w-5xl mx-auto flex flex-col gap-10 px-5">
        <div className="flex justify-between">
        <h1 className="text-4xl font-semibold text-gray-900 mb-4">
          Dashboard
        </h1>
        <h1 className="text-4xl text-gray-900">Classe de {classData?.name}</h1>
        </div>
        {/* Graphique */}
        <GenderChart />

        {/* Planning */}
        <h3 className="text-2xl text-gray-900 text-center font-semibold mb-4">
        Semaine du{" "}
        <span className="font-bold">
          {currentMonday.toLocaleDateString("fr-FR")}
        </span>
      </h3>
        <Planning monday={currentMonday}/>
      </div>
       {/* Feedbacks */}
      <div className="max-w-5xl mx-auto px-5 mt-10">
        {feedbackLoading && <p>Chargement des feedbacks...</p>}
        {feedbackError && <p>Erreur lors du chargement des feedbacks</p>}

        {feedbacksData && feedbacksData.length > 0 && (
          <ActivityFeedback activities={feedbacksData} />
        )}
      </div>
    </main>
  );
}

