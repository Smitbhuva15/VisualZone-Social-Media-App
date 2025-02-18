
import User from '@/lib/models/User';
import { connectToDB } from '@/lib/mongooes/mongooes'
import { NextResponse } from 'next/server';
import React from 'react'

export async function GET(req, { params }) {

    await connectToDB();
    const { id } = params;
    const { followId } = params;

    try {

        const user = await User.findOne({ _id: id })
        const userToFollow = await User.findOne({ _id: followId })

        const isFollowing = userToFollow?.follower.find((item) => id === item.toString())


        if (isFollowing) {
            user.following = user?.following.filter((item) => { item.toString() !== followId })
            userToFollow.follower = userToFollow?.follower.filter((item) => { item.toString() !== id });
        }
        else {
            user?.following.push(followId)
            userToFollow?.follower.push(id)
        }

        try {
            await user.save()
            await userToFollow.save()

        } catch (error) {
            console.log("error", error)
        }

        return NextResponse.json({ message: "succesfully done!!" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "error is found" }, { status: 500 })
    }


}
