import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      required: false,
    },
    post: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
      default: [],
    },
    follower: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    following: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    savedPosts: {  
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
      default: [],
    },
    like: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
