import { AppState } from "../AppState";
import { Account } from "../models/Account.js";
import { Friend } from "../models/Friend";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class AccountService {
  async getAccount() {
    try {
      const res = await api.get("/account");
      AppState.account = new Account(res.data);
    } catch (err) {
      logger.error("HAVE YOU STARTED YOUR SERVER YET???", err);
    }
  }

  async editAccount(accountBody) {
    const res = await api.put("/account", accountBody);
    AppState.account = new Account(res.data);
  }

  async getFriends() {
    const res = await api.get("/account/friends");
    logger.log(res.data);
    logger.log(res.data.filter((f) => f.account.id != AppState.account.id));
    AppState.friends = res.data.map((f) => new Friend(f));
  }
}

export const accountService = new AccountService();
