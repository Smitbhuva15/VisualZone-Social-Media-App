"use client"
import PostCrad from '@/components/card/PostCrad';
import Loader from '@/components/Loader';
import { useUser } from '@clerk/nextjs';
import React, { useState } from 'react'
import { useEffect } from 'react';

export default function page() {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
   const [userData, setUserData] = useState({});

  const [allPost, setAllPost] = useState([]);

  const getallpost=async()=>{
   try {
    const res=await fetch('api/post',{
      method:'GET'
     })
     if(res.ok){
      const data=await res.json();
      setAllPost(data.post);
      setLoading(false)
      console.log("successfully get all the post");
     }
     else{
      console.log("error found to get all the post");
  
     }
    
   } catch (error) {
     console.log(error,"Internal server Error!!")
   }
  }

  const getUser = async () => {
    const response = await fetch(`/api/user/${user.primaryEmailAddress.emailAddress}`);
    const data = await response.json();
    setUserData(data.userdata);
 };
 

  useEffect(()=>{
    if(user){
      getUser();
      getallpost()
    }
   
  },[user])
  

  return (
    !isLoaded || loading 
    ?
    (<Loader />)
    :
    (
      allPost.map((post)=>(
        <PostCrad 
         key={post._id}
         post={post}
         creator={post.creator}
         loggedInUser={userData}
        />
      ))
    )
  )
}
