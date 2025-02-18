
"use client"

import Posting from '@/components/form/Posting'
import Loader from '@/components/Loader';
import { useUser } from '@clerk/nextjs'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function EditPost() {

  const { id } = useParams();

   console.log(id)
  const { user, isLoaded } = useUser ();
  const[post,SetPost]=useState({})
  const [loading, setLoading] = useState(true);

  // const [userData, setUserData] = useState({});

  //  const getUser = async () => {
      
  //     const response = await fetch(`/api/user/${user.primaryEmailAddress.emailAddress}`);
  //     const data = await response.json();
  //     setUserData(data.userdata);
  //     setLoading(false);
  //   };

    const getPost=async ()=>{
      const response = await fetch(`/api/post/${id}`,{
        method:'GET'
      });
      const data = await response.json();
      // console.log(data)
     SetPost(data.post)
     setLoading(false);
    }
    
    useEffect(() => {
     
        getPost()
      
    }, [user,id]);

  const postData = {
    creatorId: post?.creator?._id,
    caption: post.caption,
    tag: post.tag,
    postPhoto: post.postPhoto,
  };
  
  // console.log(postData,"postdata.......................")

  return (
    !isLoaded || loading ?(<Loader />):
   (<Posting post={postData} apiEndpoint={`/api/post/${id}`}/>)
  )
}



