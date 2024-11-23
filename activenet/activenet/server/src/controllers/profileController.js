import { regularUser } from '../models/regularUserModel.js'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

// Setup __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'public', 'uploads'))
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${req.params.id}-${Date.now()}${ext}`)
  },
})

const upload = multer({ storage: storage })

// Controller for profile picture upload
class profileController {
  static async RegisterProfilePicture(req, res, next) {
    try {
      const { id } = req.params
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' })
      }

      const profilePicturePath = path.join('/public/uploads', req.file.filename);

      // Update the user's profile picture path
      const userPhoto = await regularUser.findByIdAndUpdate(
        id,
        { profilePicture: profilePicturePath },
        { new: true }
      )

      if (!userPhoto) {
        return res.status(404).json({ error: 'User not found' })
      }

      res.json({ profilePicture: profilePicturePath })
    } catch (err) {
      next(err) // Pass the error to the error handler middleware
    }
  }
}

export { profileController, upload }
