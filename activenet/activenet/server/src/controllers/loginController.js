import { users } from '../models/signUp.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class loginController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body

      // Search user by email
      const user = await users.findOne({ email: email })
      if (!user) {
        console.log('User not found')
        return res.status(404).json({ message: 'User not found' })
      }

      // check the password
      const isMatch = await bcrypt.compare(password, user.password)
      console.log('password check', isMatch)

      if (!isMatch) {
        console.log('Invalid password')
        return res.status(401).json({ message: 'Invalid password' })
      }

      // Create the token with the user data
      const token = jwt.sign(
        { id: user._id, accountType: user.accountType },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      )

      console.log('Login successful')

      // Send response with token
      res.status(200).json({
        message: 'Login successful',
        token: token, // Token JWT
        accountType: user.accountType,
        profilePicture: user.profilePicture,
      })
    } catch (err) {
      console.error('Login error', err)
      next(err)
    }
  }
}

export default loginController
