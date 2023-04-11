import { AppState } from "../AppState";
import { Room } from "../models/Room";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class RoomsService {
  async setActiveRoom(roomId) {
    const res = await api.get(`api/rooms/${roomId}`);
    AppState.room = new Room(res.data);
  }
}

export const roomsService = new RoomsService();
