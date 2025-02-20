'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'
import Menu from './Menu'
import { UserButton, useUser } from "@clerk/nextjs";
import { dark } from '@clerk/themes'
import { set } from 'react-hook-form'
import { connectToDB } from '@/lib/mongooes/mongooes'
import Loader from '../Loader'

const LeftSideBar = () => {
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

  

  return (
    loading || !isLoaded ?( <></>):

    (<div className="h-screen left-0 top-0 sticky overflow-auto px-10 py-6 flex flex-col gap-6 max-md:hidden 2xl:w-[350px] pr-20 custom-scrollbar"  style={{ background: '#202123' }}>

      {/* logo? */}
      <Link href={`/`}  >
      <Image src="/assets/visual-logo.svg" alt="Visual Zone Logo" width={200} height={70} />
      </Link>
      

      {/* photo and username */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 items-center text-light-1">
          <Link href={`/profile/${userData._id}/posts`}>
            <Image
              src={userData.profilePhoto}
              alt="profile photo"
              width={50}
              height={50}
              className="rounded-full"
            />
          </Link>
          <p className="text-small-bold">
            {userData.firstName} {userData.lastName}
          </p>
        </div>

        <div className="flex text-light-1 justify-between">
          <div className="flex flex-col items-center">
            <p className="text-base-bold">{userData?.post.length}</p>
            <p className="text-tiny-medium">Posts</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-base-bold">{userData?.follower.length}</p>
            <p className="text-tiny-medium">Followers</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-base-bold">{userData?.following.length}</p>
            <p className="text-tiny-medium">Following</p>
          </div>
        </div>
      </div>

      <hr />

      <Menu />

      <hr />

      <div className="flex gap-4 items-center">
        <UserButton  appearance={dark} afterSignOutUrl="/sign-in"/>
        <p className="text-light-1 text-body-bold">Manage Account</p>
      </div>
    </div>
    )
   
  )
}

export default LeftSideBar