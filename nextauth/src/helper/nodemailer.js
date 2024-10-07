import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import crypto from 'crypto';

export const sendEmailAndUpdateUser = async ({ email, emailType, userId }) => {
  try {
    // Generate a verification token
    const verifyToken = crypto.randomBytes(32).toString('hex');
    const verifyTokenExpiry = Date.now() + 60 * 60 * 1000; // Token valid for 1 hour

    // Update user with the verification token and expiry
    await User.findByIdAndUpdate(userId, {
      verifyToken,
      verifyTokenExpiry,
      isVerified: false, // Ensure the user is set to unverified until they verify their email
    });

    // Create the email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Define the email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Verify Your Email`,
      html: `<p>Please click the link below to verify your email address:</p>
             <a href="${process.env.FRONTEND_URL}/verify-email?token=${verifyToken}">Verify Email</a>
             <p>This link will expire in 1 hour.</p>`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent: %s', info.messageId);

    return { success: true, message: 'Verification email sent successfully' };
  } catch (error) {
    console.error('Error sending email or updating user:', error);
    return { success: false, message: 'Failed to send verification email', error };
  }
};
