import dbConnect from '@/dbConfig/dbConnect'; // Assuming you're using a database connection utility
import { User } from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

export default async function verifyEmail(req:NextRequest, res:NextResponse) {
  await dbConnect(); // Connect to database if not already connected

  if (req.method === 'GET') {
    const reqBody=req.json() // Extract token from query params
    const { token } =await reqBody;
    if (!token) {
      return NextResponse.json({ success: false, message: 'Token is required' });
    }

    try {
      // Find the user with the matching verifyToken and ensure the token has not expired
      const user = await User.findOne({
        verifyToken: token,
        verifyTokenExpiry: { $gt: Date.now() }, // Check if token is not expired
      });

      if (!user) {
        return NextResponse.json({ success: false, message: 'Invalid or expired token' });
      }

      // Update the user's verification status and clear the token fields
      user.isVerified = true;
      user.verifyToken = undefined;
      user.verifyTokenExpiry = undefined;
      await user.save();

      return NextResponse.json({ success: true, message: 'Email verified successfully' });
    } catch (error) {
      console.error('Error verifying email:', error);
      return NextResponse.json({ success: false, message: 'Internal server error' });
    }
  } else {
    return NextResponse.json({ success: false, message: 'Method not allowed' });
  }
}
