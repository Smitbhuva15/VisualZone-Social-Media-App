"use client"

import { Bookmark, BookmarkBorder, BorderColor, Delete, Favorite, FavoriteBorder } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function PostCrad({ post, creator, loggedInUser, update, updatepost }) {


    // console.log(post)
    // console.log(loggedInUser)

    const isLiked = loggedInUser?.like?.find((item) => item._id === post._id);
    const isSaved = loggedInUser?.savedPosts?.find((item) => item._id === post._id);
    
   
     

    const handelLike = async () => {
        try {
            const res = await fetch(`/api/user/${loggedInUser._id}/like/${post._id}`, {
                method: 'GET',

            })
            if (res.ok) {
                const data = await res.json();
                console.log(data.message)
                update()
                updatepost()
            }


        } catch (error) {
            console.log("not liked from client side")
        }
    }

    const handelsave = async () => {
        try {
            const res = await fetch(`/api/user/${loggedInUser._id}/save/${post._id}`, {
                method: 'GET',

            })
            if (res.ok) {
                const data = await res.json();
                console.log(data.message)
                update()
            }


        } catch (error) {
            console.log("not saved from client side")
        }
    }

    const handeldelete = async (postId) => {
        try {
            const res = await fetch(`/api/user/${loggedInUser._id}/delete/${postId}`, {
                method: 'GET',

            })
            if (res.ok) {
                const data = await res.json();
                console.log(data.message)
                updatepost()
            }


        } catch (error) {
            console.log("not saved from client side")
        }
    }

    
    return (
        <div className="w-full max-w-xl rounded-lg flex flex-col gap-4  p-5 max-sm:gap-2" style={{background:'#202123'}}>
            <div className="flex justify-between">
                <Link href={`/profile/${creator._id}/posts`}>
                    <div className="flex gap-3 items-center">
                        <Image
                            src={creator.profilePhoto}
                            alt="profile photo"
                            width={50}
                            height={50}
                            className="rounded-full"
                        />
                        <div className="flex flex-col gap-1">
                            <p className="text-small-semibold text-light-1">
                                {creator.firstName} {creator.lastName}
                            </p>
                            <p className="text-subtle-medium text-light-3">
                                @{creator.userName}
                            </p>
                        </div>
                    </div>
                </Link>

                {
                    loggedInUser._id === creator._id && (
                        <Link href={`/edit-post/${post._id}`}>
                            <BorderColor sx={{ color: "white", cursor: "pointer" }} />
                        </Link>
                    )
                }

            </div>

            <p className="text-body-normal text-light-1 max-sm:text-small-normal">
                {post.caption}
            </p>
            <Image
                src={post.postPhoto || "/assets/puppy.jpg"}
                alt="post photo"
                width={200}
                height={150}
                className="rounded-lg w-full"
            />

            <p className="text-base-semibold text-purple-1 max-sm:text-small-normal">
                {post.tag}
            </p>

            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    {!isLiked ? (
                        <FavoriteBorder sx={{ color: "white", cursor: "pointer" }} onClick={() => handelLike()} />
                    ) : (
                        <Favorite sx={{ color: "red", cursor: "pointer" }} onClick={() => handelLike()} />
                    )}
                    <p className="text-light-1">{ post?.likePhoto?.length}</p>
                </div>

                {loggedInUser._id !== creator._id &&
                    (isSaved ? (
                        <Bookmark sx={{ color: "purple", cursor: "pointer" }} onClick={() => handelsave()} />
                    ) : (
                        <BookmarkBorder sx={{ color: "white", cursor: "pointer" }} onClick={() => handelsave()} />
                    ))}

                {loggedInUser._id === creator._id && (
                    <Delete sx={{ color: "white", cursor: "pointer" }} onClick={()=>{handeldelete(post._id)}}/>
                )}
            </div>

        </div>
    )
}
