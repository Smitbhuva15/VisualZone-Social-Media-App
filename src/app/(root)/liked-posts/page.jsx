"use client"
import Loader from '@/components/Loader';
import PostCrad from '@/components/card/PostCrad';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'

export default function LikedPosts() {

  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
    const [allPost, setAllPost] = useState([]);
  
    const [userData, setUserData] = useState({});
     const getUser = async () => {
          
          const response = await fetch(`/api/user/${user.primaryEmailAddress.emailAddress}`);
          const data = await response.json();
          setUserData(data.userdata);
          setLoading(false);
        
        };

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
      
        useEffect(() => {
          if (user) {
            getUser()
            getallpost()
          }
        }, [user]);
    
  

  return (
    !isLoaded || loading ?
    (
      <Loader />
    )
    :
    (
      <div className='flex flex-col gap-9'>
      {userData?.like?.map((post) => (
        <PostCrad key={post._id} post={post} creator={post.creator} loggedInUser={userData} update={getUser} updatepost={getallpost}/>
      ))}
    
    </div>
    
    )
  )
}
