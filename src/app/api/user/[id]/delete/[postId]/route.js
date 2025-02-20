import Post from '@/lib/models/Post';
import User from '@/lib/models/User';
import { NextResponse } from 'next/server';
import React from 'react'

export async function GET(req, { params }) {
  
    const id=params.id;
    const  postId  = params.postId;

    try {

        const user = await User.findOne({ _id: id })
         await Post.findByIdAndDelete(postId)
   
         user.post=user.post.filter((item) => item.toString()!==postId)


        try {
            await user.save()
      
        } catch (error) {
            console.log("error", error)
        }

        return NextResponse.json({ message: "succesfully delete post done!!" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "error is found to delete post " }, { status: 500 })
    }

}
