'use client'

// import { Button } from '@/components/ui/button'
import { Button } from '@/components/ui/moving-border'
import React from 'react'

const Page = () => {
  return (
    <div className='relative h-screen'>
      <div className='absolute inset-0'>
        <img
          src="https://muffingroup.com/blog/wp-content/uploads/2021/03/gr.jpg"
          alt="Home Page"
          className="w-full h-full object-cover"
        />
      </div>
      <div className='relative z-10 flex flex-col items-center justify-center h-full'>
        <h1 className='text-5xl font-bold text-white leading-relaxed'>&ldquo;Grow Green, Live Clean<br/>Plant Trees, Build Dreams&rdquo;</h1>
        <div className='mt-10'>
          <Button className='bg-green-700 border border-green-700 text-lg'>Plant Now</Button>
        </div>
      </div>
    </div>
  )
}

export default Page
