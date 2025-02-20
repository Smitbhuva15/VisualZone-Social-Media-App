import User from '@/lib/models/User';
import { connectToDB } from '@/lib/mongooes/mongooes'
import { NextResponse } from 'next/server';
import React from 'react'

export async function GET(req, { params }) {
  await connectToDB();
  const { _id } = await params; 
  try {
    const user = await User.findOne({ _id: _id }).populate("follower following post savedPosts like")
   

     return NextResponse.json({ message: "User data successfully fetched", userdata: user }, { status: 200 });

  } catch (error) {
    console.log("Error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }

}
