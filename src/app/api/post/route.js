import Post from '@/lib/models/Post';
import { connectToDB } from '@/lib/mongooes/mongooes'
import { NextResponse } from 'next/server';
import React from 'react'

export async function GET() {

  await connectToDB();
   try {
    const data = await Post.find()
  .sort({ createdAt: -1 }) 
  .populate({
    path: "creator likePhoto", 
  
  })
  .exec();
    
    return NextResponse.json({post:data},{ status: 200 })
    
   } catch (error) {
    console.log(error)
    return NextResponse.json({message:"Failed to fetch all Feed Posts"},{ status: 500 })
   }
    
}
