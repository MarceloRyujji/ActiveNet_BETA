import notFound from '../Error/notFound.js'
import { regularUser } from '../models/regularUserModel.js'

class userController {
  static async ListUser(req, res, next) {
    try {
      const listUser = regularUser.find({})
      req.result = listUser
      if (listUser !== null) {
        next()
      } else {
        next(new notFound('User not found'))
      }
    } catch (err) {
      next(err)
    }
  }

  static async ListUserById(req, res, next) {
    try {
      const { id } = req.params
      console.log('ID received:', id)
      const userFound = await regularUser.findById(id)

      if (userFound) {
        res.status(200).json(userFound)
      } else {
        next(new notFound('User not found'))
      }
    } catch (err) {
      next(err)
    }
  }

  static async ListUserByName(req, res, next) {
    try {
      const { userName } = req.query
      const search = {}
      if (userName) search.userName = { $regex: userName, $options: 'i' }
      const userFound = await regularUser.find(search)
      if (userFound !== null) {
        res.status(200).json(userFound)
      } else {
        next(new notFound('User not found'))
      }
    } catch (err) {
      next(err)
    }
  }

  static async RegisterUser(req, res, next) {
    try {
      const profilePicture =
        req.body.profilePicture || '/public/default-profile.jpg'

      const newUser = await regularUser.create({
        ...req.body,
        profilePicture: profilePicture,
      })
      if (newUser !== null) {
        res
          .status(201)
          .json({ message: 'User is now on database', regularUser: newUser })
      } else {
        next(new notFound('User not found'))
      }
    } catch (err) {
      next(err)
    }
  }
  static async updateUser(req, res, next) {
    try {
      const id = req.params.id

      const updateUser = await regularUser.findByIdAndUpdate(id, req.body, {
        new: true,
      })
      if (updateUser !== null) {
        res.status(200).json({ message: `User updated` })
      } else {
        next(new notFound('User not found'))
      }
    } catch (err) {
      next(err)
    }
  }
  static async deleteUser(req, res, next) {
    try {
      const id = req.params.id
      const deleteUser = await regularUser.findByIdAndDelete(id, req.body)
      if (deleteUser !== null) {
        res.status(200).json({ message: `User deleted` })
      } else {
        next(new notFound('User not found'))
      }
    } catch (err) {
      next(err)
    }
  }
}

export default userController
