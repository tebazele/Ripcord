import { Profile } from "./Profile";

export class Friend {
  constructor(data) {
    this.id = data.id;
    this.isFriend = data.isFriend;
    this.Friend = new Profile(data.friend);
  }
}
