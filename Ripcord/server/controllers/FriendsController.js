import { friendsService } from "../services/FriendsService";
import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";

export class FriendsController extends BaseController{
  constructor() {
    super('api/friends')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .get("/:id", this.getOne)
    .post("", this.create)
    .delete("/:id", this.delete)
  }

  async getOne (req, res, next) {
  try {
    let friendId = req.params.id
    let friend = await friendsService.getOne(friendId)
    return res.send(friend)
  } catch (error) {
    next(error)
  }
  }


  async create (req, res, next) {
  try {
    let friendBody = req.body
    friendBody.creatorId = req.userInfo.id
    let friend = await friendsService.create(friendBody)
    return res.send(friend)
  } catch (error) {
    next(error)
  }
  }

  async delete (req, res, next) {
  try {
    let friendId = req.params.id
    let userId = req.userInfo.id
    let message = await friendsService.delete(friendId, userId)
    return res.send(message)
  } catch (error) {
    next(error)
  }
  }


}
