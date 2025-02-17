"use client"
import Posting from '@/components/form/Posting'
import Loader from '@/components/Loader';
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'

export default function CreatePost() {

  const { user, isLoaded } = useUser();

  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({});

   const getUser = async () => {
      
      const response = await fetch(`/api/user/${user.primaryEmailAddress.emailAddress}`);
      const data = await response.json();
      setUserData(data.userdata);
      setLoading(false);
    };
  
    useEffect(() => {
      if (user) {
        getUser();
      }
    }, [user]);

  const postData = {
    creatorId: userData?._id,
    caption: "",
    tag: "",
    postPhoto: null,
  };

  return (
    !isLoaded || loading?(<Loader />):
   (<Posting post={postData}/>)
  )
}
