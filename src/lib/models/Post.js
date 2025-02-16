import mongoose from "mongoose";

const postschema=mongoose.Schema({
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
        required: true,
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

export const Post=mongoose.model.Post || mongoose.model('Post',postschema)