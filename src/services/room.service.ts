import { useQuery, type UseQueryResult } from "@tanstack/react-query";


import type { Room } from "../features/types/room.type";
import { roomApi } from "../api/room.api";


class RoomService {

public getRooms(): UseQueryResult<Room[], Error> {
    return useQuery<Room[], Error>({
      queryKey: ['rooms'],
      queryFn: roomApi.getRooms,
      
    });
  }


}


export const roomService = new RoomService();