"use client"
import UserCard from '@/components/card/UserCard';
import Loader from '@/components/Loader';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'

export default function People() {

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [loginData, setLoginData] = useState({});
  const { user, isLoaded } = useUser();
  


  const getAllUser = async () => {

    const response = await fetch(`/api/user`, {
      method: 'GET'
    });
    const data = await response.json();
    console.log(data)
    setUserData(data.userdata);
    // console.log(data.userdata)
    setLoading(false);
  };

  const getUser = async () => {

    const response = await fetch(`/api/user/${user.primaryEmailAddress.emailAddress}`);
    const data = await response.json();
    setLoginData(data.userdata);
    setLoading(false);

  }

  useEffect(() => {
    if(user){
      getUser()
      getAllUser()
    }
  }, []);


  return (
    loading ?
    (
      <Loader />
    )
    :
    (
      <div className='flex flex-col gap-4 py-6'>
      {userData?.map((user) => (
        <UserCard key={user._id} userData={user} loggedInUser={loginData} update={getUser} />
      ))}
    </div>
    )
  )
}
