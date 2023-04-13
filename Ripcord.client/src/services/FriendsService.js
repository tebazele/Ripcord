import { AppState } from "../AppState";
import { Friend } from "../models/Friend";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class FriendsService {
  async setActiveFriend(friendId) {
    const res = await api.get(`api/friends/${friendId}`);
    AppState.friend = new Friend(res.data);
  }
}

export const friendsService = new FriendsService();
