import mongoose, { Types } from "mongoose";

const userschema = mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true,
    },
    userName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    post: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
        default: []
    },
    follower: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        default: []
    },
    following: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        default: []
    },
    save: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
        default: []
    },
    like: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
        default: []
    },
})

export const User=mongoose.model('User',userschema);