import Post from '@/lib/models/Post';
import User from '@/lib/models/User';
import { connectToDB } from '@/lib/mongooes/mongooes';
import { NextResponse } from 'next/server'; // Make sure this is imported

export async function GET(req, { params }) {

    await connectToDB();
    console.log("run........////////////////////////////////////")
    const id = params.id; 
    console.log(id);

    const  postId  = params.postId;
    console.log(postId);

    try {
        const loginUser = await User.findOne({_id:id});
        console.log(loginUser, ".........................");

        // if (!loginUser) {
        //     return NextResponse.json({ message: "User not found" }, { status: 404 });
        // }

        const isSaved = loginUser?.savedPosts?.find((item) => item.toString() === postId);
        if (isSaved) {
            // If already saved, remove from savedPosts
            loginUser.savedPosts = loginUser?.savedPosts?.filter((item) => item.toString() !== postId);
        } else {
            // If not saved, add to savedPosts
            loginUser.savedPosts.push(postId);
        }

        try {
            await loginUser.save();
            return NextResponse.json({ message: "Saved/unsaved successfully!" }, { status: 200 });
        } catch (error) {
            console.log("Error saving post:", error);
            return NextResponse.json({ message: "Error saving the post from the server side" }, { status: 500 });
        }

    } catch (error) {
        console.log("Error:", error);
        return NextResponse.json({ message: "Error occurred while processing the request" }, { status: 500 });
    }
}
