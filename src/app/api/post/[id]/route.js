import Post from '@/lib/models/Post';
import { connectToDB } from '@/lib/mongooes/mongooes';
import { NextResponse } from 'next/server';
import React from 'react'

export  async function GET(req,{params}) {
   await connectToDB();
   const id=params.id;
   console.log(id)
   try {
    const data=await Post.findOne({_id:id}).populate("creator likePhoto").exec();
     return NextResponse.json({post:data},{ status: 200 })
   } catch (error) {
    console.log(error)
        return NextResponse.json({message:"Failed to fetch single post"},{ status: 500 })
   }
}



export async function POST(req,{params}) {
   await connectToDB();
   const id=params.id;
   try {
   const data = await req.formData()

   let postPhoto=data.get('postphoto');
   let creatorId=data.get('creatorId');
   let caption=data.get('caption');
   let tag=data.get('tag');
   // console.log(postPhoto,creatorId,caption,tag)
  
   const post= await Post.updateOne(
      {_id:id},
      {
         $set:{
            postPhoto,
            creatorId,
            caption,
            tag
         }
      },
      { new: true, useFindAndModify: false }
   )
   
   return NextResponse.json({message:"post updated!!"},{status:200})
   
   } catch (error) {
     return NextResponse.json(
       { message: "Internal Server Error!" },
       { status: 500 }
   );
   }

 
}



