
import User from '@/lib/models/User';
import { connectToDB } from '@/lib/mongooes/mongooes'
import { NextResponse } from 'next/server';
import React from 'react'

export async function GET(req, { params }) {

    await connectToDB();
    console.log("runnnnnnnnnnnnnnnnnnnnnnnnn")
    const id=params.id;

    const  followId  = params.followId;
    console.log(id,"............/////////")
    console.log(followId,"............/////////")

    try {

        const user = await User.findOne({ _id: id })
        const userToFollow = await User.findOne({ _id: followId })

        // console.log(user,"user............/////////")
        // console.log(userToFollow,"personToFollow............/////////")

        const isFollowing = userToFollow?.follower.find((item) => id === item.toString())
        

        if (isFollowing) {
            console.log("if run.............")
            user.following = user.following.filter((item) => item.toString() !== userToFollow._id.toString());
            console.log(user.following,"following..............#########.................")
            userToFollow.follower = userToFollow.follower.filter((item) => item.toString() !== user._id.toString());
            console.log( userToFollow.follower,"following..............#########.................")
        }
        else {
            console.log("else run...............")  

            user?.following.push( userToFollow._id )
            userToFollow?.follower.push(user._id)
        }

        try {
            await user.save()
            await userToFollow.save()
            console.log(user,"user after............/////////")
            console.log(userToFollow,"personToFollow after............/////////")

        } catch (error) {
            console.log("error", error)
        }

        return NextResponse.json({ message: "succesfully follow/unfollow done!!" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "error is found in follow/unfollow " }, { status: 500 })
    }


}
