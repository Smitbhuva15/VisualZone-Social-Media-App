
import User from '@/lib/models/User';
import { connectToDB } from '@/lib/mongooes/mongooes'
import { NextResponse } from 'next/server';
import React from 'react'

export async function GET(req, { params }) {

    await connectToDB();
   
    const id=params.id;

    const  followId  = params.followId;
    

    try {

        const user = await User.findOne({ _id: id })
        const userToFollow = await User.findOne({ _id: followId })

        const isFollowing = userToFollow?.follower.find((item) => id === item.toString())
        

        if (isFollowing) {
      
            user.following = user.following.filter((item) => item.toString() !== userToFollow._id.toString());
           
            userToFollow.follower = userToFollow.follower.filter((item) => item.toString() !== user._id.toString());
           
        }
        else {
           

            user?.following.push( userToFollow._id )
            userToFollow?.follower.push(user._id)
        }

        try {
            await user.save()
            await userToFollow.save()


        } catch (error) {
            console.log("error", error)
        }

        return NextResponse.json({ message: "succesfully follow/unfollow done!!" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "error is found in follow/unfollow " }, { status: 500 })
    }


}
