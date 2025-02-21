
"use client"
import UserCard from '@/components/card/UserCard';
import Loader from '@/components/Loader';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'


export default function SearchPeople() {

  const { query } = useParams();
  // console.log(query)
  const [loading, setLoading] = useState(true);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const { user, isLoaded } = useUser();
  const [userData, setUserData] = useState({});
  

  const getsearchuser = async () => {
   
    try {
      const res = await fetch(`/api/search/people/${query}`, {
        method: 'GET'
      })
      const data = await res.json();
      setSearchedUsers(data.users)
      console.log(data.message)
      console.log(data.users)
    } catch (error) {
      console.log("serach user fetch error", error)
    }
    finally{
      setLoading(false);
    }
  }

    const getUser = async () => {
      const response = await fetch(`/api/user/${user.primaryEmailAddress.emailAddress}`);
      const data = await response.json();
      setUserData(data.userdata);
      setLoading(false);

   };
   
  
    useEffect(()=>{
      if(isLoaded && user && user.primaryEmailAddress.emailAddress){
        getUser();
        getsearchuser()
      }
    },[user,query])


  return (
    loading || !isLoaded ?
      (<Loader />) :
      (
        <div className="flex flex-col gap-10">
        <div className="flex gap-6">
          <Link className="tab bg-dark-2" href={`/search/post/${query}`}>
            Posts
          </Link>
          <Link className="tab bg-pink-600" href={`/search/people/${query}`}>
            People
          </Link>
        </div>
  
        {searchedUsers.map((person) => (
          <UserCard key={person._id} userData={person} query={query} loggedInUser={userData}  />
        ))}


      </div>
      )

  )
}

