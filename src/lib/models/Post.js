import mongoose from "mongoose";

const postschema=new mongoose.Schema({
   creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      caption:{
        type:String,
        required:true
      },
      postPhoto: {
        type: String,
        // required: true,
      },
      tag: {
        type: String,
        required: true,
      },
      likePhoto:{
        type:[{type:mongoose.Schema.Types.ObjectId ,ref:'User'}],
        default: [],
      }

},{timestamps:true})

const Post = mongoose.models.Post || mongoose.model("Post",postschema);
export default Post;