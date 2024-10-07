import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/dbConfig/dbConnect';
import { User } from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

export default async function loginHandler(req:NextRequest, res:NextResponse) {
  await dbConnect(); // Ensure connection to database

  if (req.method === 'POST') {
    const reqBody=req.json() // Extract token from query params
    const { email, password } = await reqBody;

    // Validate if email and password are provided
    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Please provide both email and password.' },{status:400});
    }

    try {
      // Find user by email
      const user = await User.findOne({ email });

      if (!user) {
        return NextResponse.json({ success: false, message: 'Invalid email or password.' },{status:400});
      }

      // Check if the user is verified
      if (!user.isVerified) {
        return NextResponse.json({ success: false, message: 'Please verify your email first.' },{status:400});
      }

      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return NextResponse.json({ success: false, message: 'Invalid email or password.' },{status:400});
      }

      const data= { userId: user._id, email: user.email, isAdmin: user.isAdmin }
      // Generate JWT token
      const token = jwt.sign(
        data,
        process.env.JWT_SECRET !, 
        { expiresIn: '1h' } 
      );

      // Send the token in the response
      return NextResponse.json({
        success: true,
        message: 'Login successful',
        token, // Send the token back to the client
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      },{status:400}).cookies.set("token",token,{httpOnly:true});
    } catch (error) {
      console.error('Error during login:', error);
      return NextResponse.json({ success: false, message: 'Internal server error.' });
    }
  } else {
    NextResponse.json({ success: false, message: 'Method not allowed.' },{status:400});
  }
}
