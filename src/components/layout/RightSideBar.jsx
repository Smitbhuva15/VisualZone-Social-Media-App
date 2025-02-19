import Image from 'next/image'
import React from 'react'

const RightSideBar = () => {
  return (
    <div className="sticky right-0 top-0 z-20 h-screen w-[300px] xl:w-[350px] flex flex-col gap-12 overflow-auto pl-6 pr-10 py-6 max-lg:hidden">
    <div className="flex flex-col gap-4">
      <h3 className="text-light-1 text-heading3-bold">Sponsored</h3>
      <Image
        src="/assets/ad2.jpg"
        alt="ad"
        width={280}
        height={200}
        className="rounded-lg"
        priority={false}
      />
      <p className="text-body-bold text-light-1">The Bag Spot</p>
      <p className="text-small-semibold text-light-2">
      Explore Tolly Bags for stylish, durable, and functional bags perfect for everyday use. High-quality materials, trendy designs, and affordable prices. Visit us today to find your perfect bag!
      </p>
    </div>
  </div>
  )
}

export default RightSideBar