import express from 'express';
import { profileController, upload } from '../controllers/profileController.js';

const router = express.Router();

router.post(
  '/users/upload-profile-picture/:id',
  upload.single('profilePicture'),
  profileController.RegisterProfilePicture
);

export default router;
