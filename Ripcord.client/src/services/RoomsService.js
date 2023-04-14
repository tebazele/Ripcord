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

  async getFriendRoom(friendId) {
    const res = await api.get(`api/rooms/${friendId}/friend`);
    logger.log("[GETTING FRIEND ROOM]", res.data);
    // logger.log(new Room(res.data));
    AppState.room = new Room(res.data);
    let roomId = res.data.id;
    this.getMessages(roomId);
  }

  async getMessages(roomId) {
    const res = await api.get(`api/rooms/${roomId}/messages`);
    logger.log(res.data);
    AppState.messages = res.data.map((m) => new Message(m));
  }
}

export const roomsService = new RoomsService();
