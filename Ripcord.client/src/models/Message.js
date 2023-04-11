import { Profile } from "./Profile";

export class Message {
  constructor(data) {
    this.id = data.id;
    this.body = data.body;
    this.img = data.img;
    this.Creator = new Profile(data.creator);
  }
}
