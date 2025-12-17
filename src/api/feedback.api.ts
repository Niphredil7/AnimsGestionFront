import type {  FeedbackActivitySummary } from "../features/types/feedback.type";
import { axiosClient } from "../utils/axios.client";

const api = axiosClient()

class FeedbackApi {
    public async getAllFeedback(): Promise<FeedbackActivitySummary[]> {
        try {
          const { data } = await api.get<{
        data: FeedbackActivitySummary[];
        message: string;
      }>("/feedback");

          return data.data;
        } catch (error: any) {
          throw new Error(error);
        }
      }
}

export const feedbackApi = new FeedbackApi()