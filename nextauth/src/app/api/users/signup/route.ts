// pages/api/register.js
import bcrypt from 'bcryptjs';
import dbConnect from '@/dbConfig/dbConnect';  // Ensure you have dbConnect for MongoDB connection
import { NextRequest, NextResponse } from 'next/server';
import { sendEmailAndUpdateUser } from '@/helper/nodemailer'
import { User } from '@/models/userModel';

dbConnect();  // Establish a connection to the database
export  async function POST(req: NextRequest, res: NextResponse) {
  try {
    const reqBody = req.json()
    const { name, email, password } = await reqBody;

    // Check if the required fields are provided
    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: 'Please provide all the required fields', status: 401 });
    }
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ success: false, message: 'Email is already registered', status: 400 });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username:name,
      email,
      password: hashedPassword,
    });


    // Save the user to the database
    await newUser.save();
    const result = await sendEmailAndUpdateUser({ email, emailType: "verify", userId: newUser._id });
    // Respond with success
    return NextResponse.json({ success: true, message: 'User registered successfully',  },{status: 201});
  } catch (error) {
    console.error(error);
    NextResponse.json({ success: false, message: 'Server error, please try again later', status: 400 });
  }
}
