import { AppState } from "../AppState";
import { Channel } from "../models/Channel";
import { Message } from "../models/Message";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { SocketHandler } from "../utils/SocketHandler";

class SocketService extends SocketHandler {
  constructor() {
    super();
    this.on("error", this.onError)
      .on("created:channel", this.createdChannel)
      .on("created:message", this.createdMessage)
      .on("joined:room", this.joinedRoom)
      .on("left:room", this.leftRoom)
      .on("created:messageCreator", this.messageCreator);
  }

  onError(e) {
    Pop.toast(e.message, "error");
  }

  createdChannel(payload) {
    logger.log("[CREATED CHANNEL PAYLOARD]", payload);
    if (!payload) {
      throw new Error("Sorry, something went wrong with the Payload.");
    } else {
      const newChannel = new Channel(payload);
      if (AppState.account.id != newChannel.creatorId) {
        Pop.toast(`${newChannel.name} was just created. Check it out dawgs!`);
      }
      AppState.channels.push(newChannel);
    }
  }

  createdMessage(payload) {
    const message = new Message(payload);
    AppState.messages.push(message);
  }

  joinedRoom(payload) {
    logger.log("[JOINED ROOM]", payload);
    if (payload && AppState.account.id != payload.id) {
      Pop.toast(
        `
      <img class="rounded img-fluid" src="${payload.picture}">
      <p>${payload.name} has entered chat.</p>
      `,
        null
      );
    }
  }

  leftRoom(payload) {
    logger.log("[LEAVING ROOM]", payload);
    if (payload && AppState.account.id != payload.id) {
      Pop.toast(
        `
      <img class="rounded img-fluid" src="${payload.picture}">
      <p>${payload.name} has left the building.</p>
      `,
        null
      );
    }
  }

  messageCreator(payload) {
    // logger.log(payload, "message in a bottle");
    if (!AppState.channel || AppState.channel.id != payload.roomId) {
      Pop.toast(
        `${payload.creator.name} just posted in ${payload.channel.name}`,
        "info"
      );
    }
  }
}

export const socketService = new SocketService();
