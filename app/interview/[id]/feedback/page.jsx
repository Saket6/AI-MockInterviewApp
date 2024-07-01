"use client"
import React, { useEffect, useState } from 'react'
import { db } from '@/db/db'
import { UserAnswer } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { MockInterview } from '@/db/schema'
import { Progress } from '@/components/ui/progress'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown, Plus, X } from "lucide-react"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
function Feedback({ params }) {

    const [feedbacks, setFeedbacks] = useState();
    const [overallRating, setRating] = useState();
    const [interview, setInterview] = useState();

    const getUserAnswers = async () => {
        const result = await db.select().from(UserAnswer).where(
            eq(UserAnswer.mockIdRef, params?.id)
        )

        console.log(result);
        setFeedbacks(result);
    }

    const getInterviewDetails = async () => {
        const resp = await db.select().from(MockInterview).where(
            eq(MockInterview.mockId, params.id)
        )

        console.log(resp);
        setInterview(resp[0]);
    }

    useEffect(() => {
        getInterviewDetails();
    }, [params])

    useEffect(() => {
        getUserAnswers();
    }, [params])

    useEffect(() => {
        let totalRating = 0;
        let totalAnswered = 0;
        feedbacks?.forEach(feedback => {
            totalRating += parseInt(feedback.rating);
            totalAnswered++;
        });

        // console.log(totalRating, "Total Rating");
        const avgRating = Math.round(totalRating / totalAnswered);
        setRating(avgRating);

    }, [feedbacks]);

    return (
        <div>
            <h1 className=' text-2xl md:text-3xl font-semibold'>Your Feedback</h1>
            <div className='flex flex-col mt-5'>
                <div className='row-span-2 grid md:grid-cols-3 gap-3 md:gap-6 justify-items-center'>
                    <div className='dark:bg-neutral-900  items-center p-5 border-[1px] dark:border-neutral-700 w-full flex gap-3 rounded-lg'>
                        <h1 className='text-xl md:text-3xl flex flex-col '>Overall Rating:
                            <span className='text-xs md:text-sm'>
                                {
                                    overallRating > 3 ? (
                                        overallRating > 7 ? ('Your rating is Very Good') : (
                                            'Your rating is Average'
                                        )
                                    ) : (
                                        'Your rating is Very Low'
                                    )
                                }
                            </span>
                        </h1>
                        <span className='text-3xl md:text-6xl text-green-500'>{overallRating ? overallRating : ''}/10</span>
                    </div>
                    <div className='dark:bg-neutral-900 p-5 rounded-lg border-[1px] dark:border-neutral-700 w-full'>
                        {
                            feedbacks?.map((item, i) => {
                                return (
                                    <div key={i} className='mb-1'>
                                        <div className='flex justify-between'>
                                            <h1 className='mb-1 text-sm'>Question {i + 1}</h1>
                                            <h1 className='text-sm'>Rating: {item.rating}/10</h1>
                                        </div>

                                        <Progress value={parseInt(item.rating) * 10} />
                                    </div>

                                )
                            })
                        }
                    </div>

                    <div className='dark:bg-neutral-900 p-3 md:p-5 text-lg rounded-lg border-[1px] dark:border-neutral-700 w-full'>
                        <h1 className=' text-orange-400'>Job Role: <span className=' font-normal'>{interview?.jobPosition} </span> </h1>
                        <h1 className=' text-orange-400'>Job Description:  <span className='dark:text-white font-normal'> {interview?.jobDesc} </span> </h1>
                        <h1 className=' text-orange-400'>Prior Experience:  <span className='dark:text-white font-normal'> {interview?.jobExperience} years </span> </h1>
                    </div>
                </div>



                <div className='row-span-8 mt-5'>

                    <h1 className='text-xl md:text-2xl   w-max p-2 mb-5'>Review your Answers</h1>

                    {
                        feedbacks?.map((feedback, i) => {
                            return (
                                <div key={i}>

                                    <Collapsible
                                        className=""
                                    >
                                        <div className="flex items-center  md:text-lg dark:bg-neutral-900 border-[1px] dark:border-neutral-800 justify-between my-5 rounded-lg space-x-4 px-5 py-3" >
                                            Q.{i + 1}  {feedback.question}
                                            <CollapsibleTrigger asChild>


                                                <Button variant="ghost" size="sm" className="w-9  p-0">

                                                    <ChevronsUpDown className="h-4 w-4" />
                                                    <span className="sr-only">Toggle</span>
                                                </Button>

                                            </CollapsibleTrigger>
                                        </div>
                                        <CollapsibleContent className="space-y-2">
                                            <div>
                                                <h1 className='text-green-500 text-lg'>Correct Answer: </h1>
                                                <p className=''>{feedback.correctAnswer}</p>
                                            </div>

                                            <div>
                                                <h1 className='text-orange-400 text-lg'>Your Answer: </h1>
                                                <p className='text-md'>{feedback.userAnswer}</p>
                                            </div>

                                            <div>
                                                <h1 className='text-yellow-300 text-lg'>Feedback: </h1>
                                                <p>{feedback.feedback}</p>
                                            </div>
                                        </CollapsibleContent>
                                    </Collapsible>
                                </div>
                            )
                        })
                    }
                </div>

                <div className='flex justify-end'>
                    <Link href='/' className='lg:w-2/12'>
                        <Button variant='' className='w-full'>Go Home</Button>
                    </Link>
                   
                </div>



            </div>
        </div>
    )
}

export default Feedback