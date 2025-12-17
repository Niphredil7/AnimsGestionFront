import { FaHeart } from "react-icons/fa";
import type { FeedbackActivitySummary } from "../types/feedback.type";


interface ActivityFeedbackProps {
  activities: FeedbackActivitySummary[];
}

export default function ActivityFeedback({ activities }: ActivityFeedbackProps) {
  return (
    <div className="w-full max-w-xl mx-auto bg-white shadow-md rounded-3xl p-5 border border-gray-200">
      <h2 className="text-center text-xl font-semibold text-gray-700 mb-4">
        Feedback
      </h2>

      <div className="grid grid-cols-3 gap-4 text-center">
        {activities.map((act) => (
          <div
            key={act.activityId}
            className="flex items-center justify-center gap-2"
          >
            <span className="font-medium text-gray-800">
              {act.activityName}
            </span>
            <FaHeart className="text-orange-500" />
            <span className="font-bold text-gray-900">{act.likes}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
