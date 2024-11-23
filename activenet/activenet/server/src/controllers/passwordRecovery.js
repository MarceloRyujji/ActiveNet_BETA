import { users } from '../models/signUp.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

let verificationCodes = {};

class passwordRecovery {
  static async resetPassword(req, res, next) {
    const { email } = req.body;

    try {
      const user = await users.findOne({ email });
      if (!user) {
        console.log("email dont exist")
        return res.status(404).send('Email not registered');
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.COMPANY_EMAIL,
          pass: process.env.COMPANY_PASSWORD,
        },
      });
      console.log(transporter)
      const code = crypto.randomInt(100000, 999999).toString();
      verificationCodes[email] = code;

      const mailOptions = {
        from: "activenetfit@gmail.com",
        to: email,
        subject: 'Password Reset Verification Code',
        text: `Your verification code is: ${code}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          return res.status(500).send('Error sending email');
        }
        res.status(200).send('Verification code sent');
      });
    } catch (err) {
      next(err);
    }
  }

  static async newPassword(req, res, next) {
    const { email, code, newPassword } = req.body;

    if (verificationCodes[email] !== code) {
      return res.status(400).send('Invalid verification code');
    }

    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const updatedUser = await users.findOneAndUpdate(
        { email },
        { password: hashedPassword }
      );

      if (!updatedUser) {
        return res.status(404).send('User not found');
      }

      delete verificationCodes[email];
      res.status(200).send('Password has been reset');
    } catch (err) {
      next(err);
    }
  }
}

export default passwordRecovery;
