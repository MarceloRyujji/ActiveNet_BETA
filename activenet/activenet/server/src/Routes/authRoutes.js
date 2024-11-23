import { Router } from 'express'
import authenticateToken from '../middlewares/authenticateToken.js'
import { regularUser } from '../models/regularUserModel.js'

const router = Router()

router.get('/auth/status', authenticateToken, async (req, res) => {
  try {
    // Gets the user from the database using the decoded userId from the JWT
    const user = await regularUser.findById(req.user.id)

    if (!user) {
      return res
        .status(404)
        .json({ isAuthenticated: false, message: 'User not found' })
    }

    // Return all user data along with authentication information
    res.json({
      isAuthenticated: true,
      accountType: user.accountType,
      profilePicture: user.profilePicture.replace(/\\/g, '/'),
      userId: user._id,
      userData: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        availableHours: user.availableHours,
        biography: user.biography,
        city: user.city,
        gender: user.gender,
        phone: user.phone,
        socialMediaLinks: user.socialMediaLinks,
        specialties: user.specialties,
      },
    })
  } catch (error) {
    console.error('Error retrieving user data:', error)
    res
      .status(500)
      .json({ isAuthenticated: false, message: 'Internal server error' })
  }
})

export default router
