import { PersonAddAlt, PersonRemove } from '@mui/icons-material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function UserCard({ userData, loggedInUser,updateuser }) {
    const routes=useRouter()
    const [refetchUser,setRefetchUser]= useState({})
    const [newUserData,setNewUserData]=useState( userData)

    const getUser = async () => {
        const response = await fetch(`/api/user/${userData.email}`);
        const data = await response.json();
        setNewUserData(data.userdata)
     };

    

    const handleFollow = async () => {
        try {
            const res = await fetch(`/api/user/${loggedInUser._id}/follow/${userData._id}`,
                {
                    method: 'GET'
                }
            )
            if (res.ok) {
                const data = await res.json();
                console.log(data.message)
                getUser();
                updateuser()
            }
            else {
                console.log("server side error")
            }
        } catch (error) {
            console.log("client error found")
        }
    }
   


    const isFollow = newUserData?.follower?.find((item) =>
        item === loggedInUser._id
    )

    return (
        <div className="flex justify-between items-center">
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

            {
                newUserData._id !== loggedInUser._id &&
                (
                    isFollow
                        ?
                        (
                            (
                                <PersonRemove
                                    sx={{ color: "#7857FF", cursor: "pointer" }}
                                    onClick={() => handleFollow()}
                                />
                            )
                        )
                        :
                        (
                            <PersonAddAlt
                                sx={{ color: "#7857FF", cursor: "pointer" }}
                                onClick={() => handleFollow()}
                            />
                        )
                )

            }
        </div>
    )
}
