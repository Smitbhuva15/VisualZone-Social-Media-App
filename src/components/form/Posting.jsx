"use client";
import { CldImage } from 'next-cloudinary';
import { AddPhotoAlternateOutlined } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { from } from 'svix/dist/openapi/rxjsStub';

export default function Posting({ post, apiEndpoint }) {
//  console.log(post)
  const {
    register,
    handleSubmit,
  
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: post,
  });

  const router = useRouter();

  const handlePublish = async (data) => {
    console.log(data)
    try {
      const formdata = new FormData();
      const newformdata = new FormData();

      newformdata.append("file", data.postPhoto[0])
      newformdata.append('upload_preset', 'my-uploads');
      const photourl = await fetch(`https://api.cloudinary.com/v1_1/dnprslnrx/image/upload`, {
        method: 'POST',
        body: newformdata
      }).then(r => r.json());

      // console.log( photourl)
      formdata.append("creatorId", post.creatorId)
      formdata.append("caption", data.caption)
      formdata.append("tag", data.tag)
      formdata.append("postphoto", photourl.secure_url)




      const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: formdata
      })

      if (response.ok) {
        const data = await response.json();
        console.log(data, "push other routes ,create successfully!!");
       
      }
      else {
        console.log("error found")
      }
    } catch (error) {
      console.log("Internal server error", error)

    }


  };

  return (
    <form className="flex flex-col gap-7 pb-24" onSubmit={handleSubmit(handlePublish)}>
      <label htmlFor="photo" className="flex gap-4 items-center text-light-1 cursor-pointer">
        {watch("postPhoto") ? (

          typeof watch("postPhoto") === "string"?(
            
              <Image
              src={post.postPhoto}
              alt="post34"
              width={250}
              height={200}
              className="object-cover rounded-lg"
            />
            ):(
              <Image
              src={URL.createObjectURL(watch("postPhoto")[0])}
              alt="post"
              width={250}
              height={200}
              className="object-cover rounded-lg"
            />
            )
        
        ) :
          (
            <AddPhotoAlternateOutlined
              sx={{ fontSize: "100px", color: "white" }}
            />
          )}
        <p>Upload a photo</p>
      </label>

      <input
        type="file"
        id="photo"
        className="hidden"

        {...register("postPhoto", { required: true })}
      />
      {errors.postPhoto && <p className="text-red-500">Photo is required !!</p>}

      <div>
        <label htmlFor="caption" className="text-light-1">
          Caption
        </label>
        <textarea
          {...register("caption", {
            required: "Caption is required",
            validate: (value) => {
              if (value.length < 3) {
                return "Caption must be more than 2 characters";
              }
            },
          })}
          rows={3}
          placeholder="What are you thinking about?"
          className="w-full input"
          id="caption"
        />
        {errors.caption && <p className="text-red-500">{errors.caption.message}</p>}
      </div>

      <div>
        <label htmlFor="tag" className="text-light-1">
          Tag
        </label>
        <input
          {...register("tag", { required: "Tag is required" })}
          type="text"
          placeholder="#tag"
          className="w-full input"
        />
        {errors.tag && <p className="text-red-500">{errors.tag.message}</p>}
      </div>

      <button
        type="submit"
        className="py-2.5 rounded-lg mt-10 bg-purple-1 hover:bg-pink-1 text-light-1"
      >
        Publish
      </button>
    </form>
  );

}
