
import User from '@/lib/models/User';
import { connectToDB } from '@/lib/mongooes/mongooes';
import { NextResponse } from 'next/server';
import React from 'react'

export async function GET(req, { params }) {
  await connectToDB();

 const { query } = await params; 
 console.log(query)

  try {
    const data=await User.find({
      $or: [
        { userName: { $regex: query, $options: 'i' } },
        { firstName: { $regex: query, $options: 'i' } },
        {  lastName: { $regex: query, $options: 'i' } }

      ]
    })

    
   if(!data){
    return NextResponse.json({ message: "not found" }, { status: 404 });

   }

    return NextResponse.json({ message: "fetch successfully",users:data }, { status: 200 });


  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }

}
