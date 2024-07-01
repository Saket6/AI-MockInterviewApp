import React from 'react'
import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'
function page() {
  return (
    <div className='min-h-screen flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center'>
        <Image src='/images/logo.svg' width={200} height={200} className='mb-2' alt=''/>
        <SignIn/>
        </div>
    </div>
  )
}

export default page