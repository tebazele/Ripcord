import { Channel } from "../models/Channel";
import { Message } from "../models/Message";
import { User } from "../models/User";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class ChannelsService {
  async getAll() {
    const res = await api.get("api/channels");
    let channels = res.data.map((c) => new Channel(c));
    logger.log(channels);
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
}

export const channelsService = new ChannelsService();
