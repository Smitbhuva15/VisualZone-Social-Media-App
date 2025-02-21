"use client"
import React, { useState } from 'react'
import { Add, Logout, Person, Search } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { dark } from '@clerk/themes';
import Image from 'next/image';



const TopBar = () => {
  const[search,setSearch]=useState("")
  const router=useRouter()

  return (
      <div>
   <div className='md:hidden flex'>
   <Link href={`/`}  >
      <Image src="/assets/logo5.svg" alt="Visual Zone Logo" width={200} height={70} />
      </Link>
   </div>

    <div className="flex justify-between items-center mt-6">
     
        <div className="relative">
        <input
          type="text"
          className="search-bar"
          placeholder="Search posts, people, ..."
          value={search}
          onChange={(e)=>{setSearch(e.target.value)}}
        />
        <Search
          className="search-icon"
          onClick={() => router.push(`/search/post/${search}`)}
        />
      </div>
      

    

      <button
        className="create-post-btn "
        onClick={() => router.push("/create-post")}
      >
        <Add /> <p>Create A Post</p>
      </button>


      <div className="flex gap-4 md:hidden">
        <UserButton appearance={{ baseTheme: dark }} afterSignOutUrl="/sign-in" />
      </div>
    </div>
    </div>

  )
}

export default TopBar