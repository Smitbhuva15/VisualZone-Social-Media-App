import User from '@/lib/models/User';
import { connectToDB } from '@/lib/mongooes/mongooes';
import { NextResponse } from 'next/server';
import React from 'react'

export async function GET(req, { params }) {
  await connectToDB();

  const id=params.id;
 
  try {
     const data=await User.findOne({_id:id})
     .populate({
      path:'post',
      options: { sort: { createdAt: -1 } },
      populate:{
        path:'creator',
      }
     }).exec();

     return NextResponse.json({ message: "Profile User data successfully fetched", user: data }, { status: 200 });  

  } catch (error) {
    console.log("Error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
