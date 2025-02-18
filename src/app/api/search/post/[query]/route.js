import Post from '@/lib/models/Post';
import { connectToDB } from '@/lib/mongooes/mongooes';
import { NextResponse } from 'next/server';
import React from 'react'

export async function GET(req, { params }) {
  await connectToDB();

 const { query } = await params; 


  try {
    const data=await Post.find({
      $or: [
        { caption: { $regex: query, $options: 'i' } },
        { tag: { $regex: query, $options: 'i' } }
      ]
      
    }).populate('creator likePhoto').exec()

    
   if(!data){
    return NextResponse.json({ message: "not found" }, { status: 404 });

   }

    return NextResponse.json({ message: "fetch successfully",posts:data }, { status: 200 });


  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }

}
