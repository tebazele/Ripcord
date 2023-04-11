import { AppState } from "../AppState";
import { Channel } from "../models/Channel";
import { Message } from "../models/Message";
import { Room } from "../models/Room";
import { User } from "../models/User";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class ChannelsService {
  async getAll() {
    const res = await api.get("api/channels");
    AppState.channels = res.data.map((c) => new Channel(c));
  }

  async setActiveChannel(serverId) {
    const res = await api.get(`api/channels/${serverId}`);
    logger.log(new Channel(res.data));
    AppState.channel = new Channel(res.data);
    await this.getRooms(serverId);
  }

  async getUsers() {
    const res = await api.get("api/channels/64359c414dc0b5da04e9666e/users");
    let users = res.data.map((u) => new User(u));
    logger.log(users);
  }

  async getMessages() {
    const res = await api.get("api/channels/64359c414dc0b5da04e9666e/messages");
    let messages = res.data.map((m) => new Message(m));
    logger.log(messages);
  }

  async getRooms(channelId) {
    const res = await api.get(`api/channels/${channelId}/rooms`);
    AppState.rooms = [];
    AppState.rooms = res.data.map((r) => new Room(r));
  }
}

export const channelsService = new ChannelsService();
