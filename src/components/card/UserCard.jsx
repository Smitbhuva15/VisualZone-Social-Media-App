import { PersonAddAlt } from '@mui/icons-material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function UserCard({ userData, loggedInUser }) {

    return (
        <div className="flex justify-between items-center">
            <Link className="flex gap-4 items-center" href={`/`}>
                <Image
                    src={userData.profilePhoto}
                    alt="profile photo"
                    width={50}
                    height={50}
                    className="rounded-full"
                />
                <div className="flex flex-col gap-1">
                    <p className="text-small-semibold text-light-1">
                        {userData.firstName} {userData.lastName}
                    </p>
                    <p className="text-subtle-medium text-light-3">
                        @{userData.userName}
                    </p>
                </div>
            </Link>

            {
                userData._id !== loggedInUser._id &&
                (
                    <PersonAddAlt
                        sx={{ color: "#7857FF", cursor: "pointer" }}

                    />
                )
            }
        </div>
    )
}
