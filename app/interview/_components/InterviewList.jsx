"use client"
import React, { useEffect, useState } from 'react'
import { db } from '@/db/db'
import { MockInterview } from '@/db/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import InterviewCard from './InterviewCard'
function InterviewList() {
    const { user } = useUser();
    const [interviewList, setInterviewList] = useState();
    const getInterviewList = async () => {
        const result = await db.select().from(MockInterview).where(
            eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)).orderBy(
                desc(MockInterview.id)
            )

        setInterviewList(result);

        console.log(result);
    }

    useEffect(() => {
        user && getInterviewList();
    }, [user])

    return (
        <div className=''>
            <h1 className=' text-lg md:text-2xl'> Previous Interviews </h1>
            <div className='grid  md:grid-cols-3 gap-6 mt-4'>
                {
                    !interviewList &&
                    [1,2,3,4,5,6].map((item,i)=>
                    {
                        return <div key={i} className='p-20 bg-neutral-800 animate-pulse rounded-lg'></div>

                    })
                }
                {
                    interviewList?.map((interview, i) => {
                        return <InterviewCard key={i} interview={interview} />
                    })
                }

            </div>
        </div>
    )
}

export default InterviewList