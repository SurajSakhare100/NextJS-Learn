import dbConnect from '@/dbConfig/dbConnect';
import { NextRequest, NextResponse } from 'next/server';

export default async function logoutHandler(req: NextRequest, res: NextResponse) {
  await dbConnect(); // Ensure connection to database

  if (req.method === 'POST') {
    try {
      // Clear the token cookie
      const response = NextResponse.json({
        success: true,
        message: 'Logout successful',
      });

      // Set the token cookie to expire immediately
      response.cookies.set("token", "", { httpOnly:true,maxAge: 0 });

      return response;
    } catch (error) {
      console.error('Error during logout:', error);
      return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ success: false, message: 'Method not allowed.' }, { status: 405 });
  }
}
