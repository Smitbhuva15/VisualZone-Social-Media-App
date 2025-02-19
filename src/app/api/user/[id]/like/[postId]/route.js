import Post from '@/lib/models/Post';
import User from '@/lib/models/User';
import { connectToDB } from '@/lib/mongooes/mongooes';
import { NextResponse } from 'next/server'; // Make sure this is imported

export async function GET(req, { params }) {

    await connectToDB();
  
    const id = params.id; 
    const  postId  = params.postId;
  
    try {
        const loginUser = await User.findOne({_id:id});
        const post=await Post.findOne({_id:postId})
       
        

        // if (!loginUser) {
        //     return NextResponse.json({ message: "User not found" }, { status: 404 });
        // }

        const isliked = loginUser?.like?.find((item) => item.toString() === postId);
        if (isliked) {
          
            // If already saved, remove from likedPosts
            loginUser.like = loginUser?.like?.filter((item) => item.toString() !== postId);
            post.likePhoto=post?.likePhoto?.filter((item)=>item.toString() !== id)
           
        } else {
            // If not saved, add to likedPosts
            
            loginUser.like.push(postId);
            post.likePhoto.push(loginUser._id);

        }

        try {
            await loginUser.save();
            await post.save();
            return NextResponse.json({ message: "like/like successfully!" }, { status: 200 });
        } catch (error) {
            console.log("Error saving post:", error);
            return NextResponse.json({ message: "Error saving the post from the server side for like photo" }, { status: 500 });
        }

    } catch (error) {
        console.log("Error:", error);
        return NextResponse.json({ message: "Error occurred while processing the request" }, { status: 500 });
    }
}
