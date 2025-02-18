"use client"
import React, { useState } from 'react'
import { Add, Logout, Person, Search } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { dark } from '@clerk/themes';



const TopBar = () => {
  const[search,setSearch]=useState("")
  const router=useRouter()

  return (
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
        className="create-post-btn"
        onClick={() => router.push("/create-post")}
      >
        <Add /> <p>Create A Post</p>
      </button>


      <div className="flex gap-4 md:hidden">
        <Link href={`/`}>
          <Person sx={{ fontSize: "35px", color: "white" }} />
        </Link>

        <UserButton appearance={{ baseTheme: dark }} afterSignOutUrl="/sign-in" />
      </div>
    </div>
  )
}

export default TopBar