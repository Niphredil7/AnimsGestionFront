import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { feedbackApi } from "../api/feedback.api";
import type { FeedbackActivitySummary } from "../features/types/feedback.type";

class FeedbackService {

    public getAllFeedback(): UseQueryResult<FeedbackActivitySummary[], Error> {
        return useQuery({
            queryKey : ["feedbacksSummary"],
            queryFn: feedbackApi.getAllFeedback,
        })
    }
}

export const feedbackService = new FeedbackService();