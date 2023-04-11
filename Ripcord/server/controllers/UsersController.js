import { usersService } from "../services/UsersService";
import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";

export class UsersController extends BaseController{
  constructor() {
    super('api/users')
    this.router
    .get("/:id", this.getOne)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post("", this.create)
    .delete("/:id", this.delete)
  }

  async getOne(req, res, next) {
    try {
      let userId = req.params.id
      let user = await usersService.getOne(userId)
      return res.send(user)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      let userBody = req.body
      userBody.creatorId = req.userInfo.id
      let user = await usersService.create(userBody)
      return res.send(user)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      let userId = req.params.id
      let creatorId = req.userInfo.id
      let message = await usersService.delete(userId, creatorId)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}
