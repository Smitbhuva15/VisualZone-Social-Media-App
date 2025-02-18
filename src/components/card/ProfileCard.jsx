import { useUser } from '@clerk/nextjs';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader';
import { tabs } from '@/constants';
import { PersonAddAlt, PersonRemove } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfileCard({ userData, activeTab }) {
    const router=useRouter()
    const { user, isLoaded } = useUser();
    const [loading, setLoading] = useState(true);
    const [loginUser, setLoginUser] = useState({})
    
    const getUser = async () => {
        const response = await fetch(`/api/user/${user.primaryEmailAddress.emailAddress}`);
        const data = await response.json();
        setLoginUser(data.userdata);
        setLoading(false);
    };

    useEffect(() => {
        if (user) {
            getUser();
        }
    }, [user])

    const isFollow = userData?.follower?.find((item) => 
        item===loginUser._id
       )

    const handleFollow = async () => {
        try {
            const res = await fetch(`/api/user/${loginUser._id}/follow/${userData._id}`,
                {
                    method:'GET'
                }
            )
            if (res.ok) {
                const data = await res.json();
                console.log(data.message)
                router.replace(`/profile/${userData}/posts`)
            }
            else {
                console.log("server side error")
            }
        } catch (error) {
            console.log("client error found")
        }
    }

    return (
        !isLoaded || loading ?
            (
                <Loader />
            )
            :
            (
                <div className="flex flex-col gap-9">
                    <div className="flex justify-between items-start">
                        <div className="flex gap-5 items-start">
                            <Image
                                src={userData.profilePhoto}
                                alt="profile photo"
                                width={100}
                                height={100}
                                className="rounded-full md:max-lg:hidden"
                            />

                            <div className="flex flex-col gap-3">
                                <p className="text-light-1 text-heading3-bold max-sm:text-heading4-bold">
                                    {userData.firstName} {userData.lastName}
                                </p>
                                <p className="text-light-3 text-subtle-semibold">
                                    {userData.username}
                                </p>
                                <div className="flex gap-7 text-small-bold max-sm:gap-4">
                                    <div className="flex max-sm:flex-col gap-2 items-center max-sm:gap-0.5">
                                        <p className="text-purple-1">{userData.post.length}</p>
                                        <p className="text-light-1">Posts</p>
                                    </div>
                                    <div className="flex max-sm:flex-col gap-2 items-center max-sm:gap-0.5">
                                        <p className="text-purple-1">{userData.follower.length}</p>
                                        <p className="text-light-1">Followers</p>
                                    </div>
                                    <div className="flex max-sm:flex-col gap-2 items-center max-sm:gap-0.5">
                                        <p className="text-purple-1">{userData.following.length}</p>
                                        <p className="text-light-1">Following</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {loginUser._id !== userData._id &&

                            (isFollow
                                ?
                                (
                                    <PersonRemove
                                        sx={{ color: "#7857FF", cursor: "pointer", fontSize: "40px" }}
                                        onClick={() => handleFollow()}
                                    />
                                ) :
                                (
                                    (
                                        <PersonAddAlt
                                            sx={{ color: "#7857FF", cursor: "pointer", fontSize: "40px" }}
                                            onClick={() => handleFollow()}
                                        />
                                    )
                                )
                            )

                        }
                    </div>

                    <div className="flex gap-6">
                        {tabs.map((tab, i) => (
                            <Link
                                className={`tab ${activeTab === tab.name ? "bg-purple-1" : "bg-dark-2"
                                    }`}
                                href={`/profile/${userData._id}/${tab.link}`}
                                key={i}
                            >
                                {tab.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )
    )
}
