
import Post from '@/lib/models/Post';
import { connectToDB } from '@/lib/mongooes/mongooes';
import { NextResponse } from 'next/server';
import React from 'react'

export async function POST(req) {
    await connectToDB();

    try {
    const data = await req.formData()

    let postPhoto=data.get('postphoto');
    let creatorId=data.get('creatorId');
    let caption=data.get('caption');
    let tag=data.get('tag');
    console.log(postPhoto,creatorId,caption,tag)
    
 const newpost=await Post.create( {
      creator:creatorId,
      caption,
      tag

  });



    return NextResponse.json(
      { message: "Post created successfully!" },
      { status: 200 }
  );
    } catch (error) {

      return NextResponse.json(
        { message: "Internal Server Error!" },
        { status: 500 }
    );
    }

  
}
