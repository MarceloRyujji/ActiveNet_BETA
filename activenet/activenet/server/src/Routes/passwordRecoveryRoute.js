import express from 'express';
import passwordRecovery from '../controllers/passwordRecovery.js';

const router = express.Router();

router.post('/passwordRecovery', passwordRecovery.resetPassword);
router.post('/resetPassword', passwordRecovery.newPassword);

export default router;
