"use client"
import ProfileCard from '@/components/card/ProfileCard'
import UserCard from '@/components/card/UserCard'
import Loader from '@/components/Loader'
import { useUser } from '@clerk/nextjs'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Followers() {
  const { id } = useParams()
  const [userData, setUserData] = useState({})
  const [loading, setLoading] = useState(true)
  const { user, isLoaded } = useUser();
  const [loginUser, setLoginUser] = useState({})


  const getUser = async () => {
    const response = await fetch(`/api/users/${id}`, {
      method: 'GET'
    });
    if (response.ok) {
      const data = await response.json();
      setUserData(data?.userdata)
      // console.log(data?.userdata)
      setLoading(false);
      
    }

  };

  const getloginUser = async () => {
    const response = await fetch(`/api/user/${user.primaryEmailAddress.emailAddress}`);
    const data = await response.json();
    setLoginUser(data.userdata);

  };

  useEffect(() => {
    if (user) {
      getUser();
      getloginUser()
    }
  }, [id, user])

  // console.log(loginUser,"/////////////////")
  // console.log(userData,"////")


  return (

    loading || !isLoaded ?
      (
        <Loader />
      )
      :
      (
        <div className="flex flex-col gap-9">
          <ProfileCard id={id} activeTab="Followers" />
          <div className="flex flex-col gap-9">
            {userData?.follower?.map((person) => (
              <UserCard key={person._id} userData={person} loggedInUser={loginUser} />
            ))}
          </div>
        </div>

      )


  )
}
