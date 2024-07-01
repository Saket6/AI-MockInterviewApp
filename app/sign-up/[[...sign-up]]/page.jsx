import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
export default function Page() {
    return(
        <div className='min-h-screen flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center'>
        <Image src='/images/logo.svg' width={200} height={200} className='mb-2' alt=''/>
        <SignUp/>
        </div>
    </div>
    ) ;
  }