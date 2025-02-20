"use client"
import ProfileCard from '@/components/card/ProfileCard';
import Loader from '@/components/Loader';
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { useEffect } from 'react';
import PostCrad from '@/components/card/PostCrad';
import { useUser } from '@clerk/nextjs';

export default function ProfilePage() {
  const {id}=useParams();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const { user, isLoaded } = useUser();
  const [loginUser,setLoginUser]=useState({})



  const getuserdata=async()=>{
    
    try {
      const res=await fetch(`/api/profileuser/${id}`,{
        method:'GET'
      })

      if(!res.ok){
        console.log("profile userdata not fetched");
      }
      else{
        const data=await res.json();
        setUserData(data.user);
        // console.log(data.user)
        setLoading(false)
      }

    } catch (error) {
      console.log("Internal Server Error333");
    }
  }

  const getUser = async () => {
    const response = await fetch(`/api/user/${user.primaryEmailAddress.emailAddress}`);
    const data = await response.json();
    setLoginUser(data.userdata);
 };
 
  useEffect(()=>{
     if(user){
       getUser();
       getuserdata()
     }
    
   },[user,id])
   
 

  return (
   loading ?
   (<Loader />)
   :
   (
    <div className="flex flex-col gap-9">
    <ProfileCard userData={userData} id={id} activeTab="Posts" />

    <div className="flex flex-col gap-9">
    {userData?.post?.map((post) => (

      < PostCrad  key={post._id} post={post} creator={post.creator} loggedInUser={loginUser}  update={getUser} />
    ))}
  </div>
    </div>
   )
  )
}
