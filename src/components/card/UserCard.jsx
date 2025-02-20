
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function UserCard({ userData, loggedInUser,updateuser }) {

    const [newUserData,setNewUserData]=useState( userData)
   
    const getUser = async () => {
        const response = await fetch(`/api/user/${userData.email}`);
        const data = await response.json();
        setNewUserData(data.userdata)
     };


    return (
        <div className="flex justify-between items-center rounded-2xl py-2 px-2"  style={{background:'#202123'}}>
            <Link className="flex gap-4 items-center" href={`/profile/${newUserData._id}/posts`}>
                <Image
                    src={userData.profilePhoto}
                    alt="profile photo"
                    width={50}
                    height={50}
                    className="rounded-full"
                />
                <div className="flex flex-col gap-1">
                    <p className="text-small-semibold text-light-1">
                        {newUserData.firstName} {newUserData.lastName}
                    </p>
                    <p className="text-subtle-medium text-light-3">
                        @{newUserData.userName}
                    </p>
                </div>
            </Link>

          
        </div>
    )
}
