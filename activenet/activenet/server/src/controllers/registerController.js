import bcrypt from 'bcrypt'
import { users } from '../models/signUp.js'

class signUpController {
  static async RegisterUser(req, res, next) {
    try {
      const { email, password, firstName, lastName, ...profileData } = req.body

      // Check if the email already exists
      const existingUser = await users.findOne({ email })

      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' })
      }

      // Encrypt the password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Create a new user and profile in `users`
      const newUser = await users.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        profilePicture: '/public/default-profile.jpg',
        ...profileData,
      })

      if (newUser) {
        // Send a successful response with the user profile
        res.status(201).json({
          message: 'Welcome to ActiveNet!',
          userProfile: newUser,
          redirectUrl: `/profile/${newUser._id}`,
        })
      } else {
        next(new Error('User not created'))
      }
    } catch (err) {
      next(err)
    }
  }
}

export default signUpController
