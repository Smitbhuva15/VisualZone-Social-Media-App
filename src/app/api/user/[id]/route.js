
import User from '../../../../lib/models/User';
import { connectToDB } from '@/lib/mongooes/mongooes';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  await connectToDB();
 

  const { id } = await params; 
  
 
  
  try {
    const user = await User.findOne({ email: id })
    .populate({
      path:'like savedPosts',
      populate:{
        path:"creator"
      }
    })

  // console.log(user)

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "User data successfully fetched", userdata: user }, { status: 200 });
    
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
