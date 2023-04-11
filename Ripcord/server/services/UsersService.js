import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";

class UsersService {
  async getOne(userId) {
    let user = await dbContext.Users.findById(userId).populate("creator", 'name picture').populate("channel")
    if(user == null) {
      throw new BadRequest('Sorry, that User does not exist')
    }
    return user
  }
  async create(userBody) {
    let user = await dbContext.Users.create(userBody)
    await user.populate("creator channel", 'name picture')
    return user
  }
  async delete(userId, creatorId) {
    let user = await this.getOne(userId)
    if(user.creatorId != creatorId) {
      throw new Forbidden("Sorry, you do not have permission to do that.")
    }
    await user.remove()
    return `You have successfully left that channel.`
  }

}

export const usersService = new UsersService()
