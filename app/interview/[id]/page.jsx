"use client"
import React, { useEffect, useState } from 'react'
import { db } from '@/db/db';
import { MockInterview } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';
import Link from 'next/link';
import Webcam from 'react-webcam';
function InterviewID({ params }) {

    const [interview, setInterview] = useState();
    const [webcamOpen, setWebCamOpen] = useState(false);
    const getInterviewDetails = async () => {
        const resp = await db.select().from(MockInterview).where(
            eq(MockInterview.mockId, params.id)
        )

        console.log(resp);
        setInterview(resp[0]);
    }

    useEffect(() => {
        console.log(params.id);
        getInterviewDetails();

    }, [params])

    return (
        <div>
            {
                interview ? (
                    <div>

                        <h1 className='p-2  text-start text-2xl  md:text-3xl font-semibold'><span className='text-white-400'>Lets get Started...</span> </h1>
                        <div className='md:grid md:grid-cols-10  mt-10 gap-10  min-h-96'>
                            {
                                webcamOpen ? (
                                    <div className='flex flex-col col-span-4  justify-center items-center ' >
                                        <div className='bg-neutral-900 p-5 flex items-center justify-center  w-full rounded-xl'>
                                            <Webcam className='rounded-xl'
                                                onUserMedia={() => setWebCamOpen(true)}
                                                onUserMediaError={() => setWebCamOpen(false)}
                                                mirrored={true}
                                                height={400}
                                                width={500}
                                            />


                                        </div>
                                        <Link className='mt-5 w-full' href={`/interview/${params.id}/start`}>
                                        <Button className="w-full">Start Interview</Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className='flex flex-col justify-center gap-7 col-span-4 items-center'>
                                        <div className='dark:bg-neutral-900 dark:border-2 border-neutral-800 bg-neutral-200 p-4 md:p-20 rounded-xl '>

                                            <WebcamIcon className='w-72 h-48  md:w-52 md:h-52' />
                                        </div>
                                       
                                            <Button className='font-semibold ' onClick={() => setWebCamOpen(true)} >
                                            Enable Webcam and Microphone
                                            </Button>
                                    
                                       
                                    </div>

                                )
                            }

                            <div className=' col-span-6'>

                                <h1 className=' mt-5 md:mt-0  text-lg md:text-2xl border-b-2 w-max  py-1'>Interview Details</h1>
                                <div className='flex flex-col mt-4 border-[1px] dark:border-neutral-800 p-3 md:p-5 bg-neutral-200 dark:bg-neutral-900 rounded-lg'>
                                    <p className='text-base  md:text-xl darK:text-orange-400' >Job Position: <span className=''  >{interview.jobPosition}</span></p>
                                    <p className='text-base  md:text-xl darK:text-orange-400' >Job Description / Tech Stack: <span className=''  >{interview.jobDesc}</span></p>
                                    <p className='text-base  md:text-xl darK:text-orange-400' >Years of Experience: <span className=''>{interview.jobExperience}</span></p>
                                </div>

                                <div className='rounded-xl mt-4 '>
                                    <h1 className='flex font-bold rounded-t-lg bg-orange-400 dark:bg-orange-500 p-3 md:p-5' >
                                        <Lightbulb />
                                        <span className='font-semibold ml-2'>
                                            Information
                                        </span>

                                    </h1>

                                    <div className='bg-neutral-200 dark:bg-neutral-900 border-[2px] border-neutral-800 p-3 md:p-5'>
                                    {process.env.NEXT_PUBLIC_INFO}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : ''
            }
        </div>
    )
}

export default InterviewID