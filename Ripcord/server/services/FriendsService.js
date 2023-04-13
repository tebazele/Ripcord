import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";

class FriendsService{
  async getOne(friendId) {
    let friend = await dbContext.Friends.findById(friendId).populate('friend', 'picture name')
    if(friend == null) {
      throw new BadRequest('Sorry, that friend does not exist.')
    }
    return friend
  }
  async create(friendBody) {
    let friend = await dbContext.Friends.create(friendBody)
    await friend.populate("friend", 'picture name')
    let otherFriend = friendBody
    otherFriend.friendId = friendBody.creatorId
    otherFriend.creatorId = friendBody.friendId
    await dbContext.Friends.create(otherFriend)
    let roomBody = {}
    roomBody.channelId = friendBody.friendId
    roomBody.creatorId = friendBody.creatorId
    roomBody.title = "Friend"
    await dbContext.Rooms.create(roomBody)
    return friend
  }
  async delete(friendId, userId) {
    let friend = await this.getOne(friendId)
    if(friend.creatorId != userId) {
      throw new Forbidden('Sorry, you do not have permission to do that.')
    }
    await friend.remove()
    return `You have successfully removed friend.`
  }

}

export const friendsService = new FriendsService()
