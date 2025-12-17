import type { Room } from "../features/types/room.type";
import { axiosClient } from "../utils/axios.client";

const api = axiosClient();

class RoomApi {
  public async getRooms(): Promise<Room[]> {
    try {
      const { data } = await api.get<Room[]>("/room");
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }

}

export const roomApi = new RoomApi();
