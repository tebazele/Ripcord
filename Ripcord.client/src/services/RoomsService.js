import { AppState } from "../AppState";
import { Message } from "../models/Message";
import { Room } from "../models/Room";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class RoomsService {
  async setActiveRoom(roomId) {
    const res = await api.get(`api/rooms/${roomId}`);
    AppState.room = new Room(res.data);
    this.getMessages(roomId);
  }

  async getMessages(roomId) {
    const res = await api.get(`api/rooms/${roomId}/messages`);
    AppState.messages = res.data.map((m) => new Message(m));
  }
}

export const roomsService = new RoomsService();
