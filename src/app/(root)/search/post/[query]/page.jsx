"use client"
import Loader from '@/components/Loader';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import PostCrad from '@/components/card/PostCrad';

export default function SearchPost() {

  const { query } = useParams();
  // console.log(query)
  const [loading, setLoading] = useState(true);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const { user, isLoaded } = useUser();
  const [userData, setUserData] = useState({});
  

  const getsearchpost = async () => {
  
    try {
      const res = await fetch(`/api/search/post/${query}`, {
        method: 'GET'
      })
      const data = await res.json();
      setSearchedPosts(data.posts)
      console.log(data.message)
      console.log(data.posts)
    } catch (error) {
      console.log("serch post fetch error", error)
    }
    finally{
      setLoading(false);
    }
  }

    const getUser = async () => {
      const response = await fetch(`/api/user/${user.primaryEmailAddress.emailAddress}`);
      const data = await response.json();
      setUserData(data.userdata);
   };
   
  
    useEffect(()=>{
      if(user){
        getUser();
        getsearchpost()
      }
    },[user,query])


  return (
    loading || !isLoaded ?
      (<Loader />) :
      (
        <div className="flex flex-col gap-10">
          <div className="flex gap-6">
            <Link className="tab bg-purple-1" href={`/search/post/${query}`}>
              Posts
            </Link>
            <Link className="tab bg-dark-2" href={`/search/people/${query}`}>
              People
            </Link>
          </div>

          {searchedPosts.map((post) => (
            <PostCrad key={post._id} post={post} creator={post.creator} loggedInUser={userData} />
          ))}

        </div>
      )

  )
}
