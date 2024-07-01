"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import { db } from '@/db/db';
import { MockInterview } from '@/db/schema';
import Questions from './_components/Questions';
import RecordAnswer from './_components/RecordAnswer';
import { eq } from 'drizzle-orm';
function Start({ params }) {

    const [interview, setInterview] = useState();
    const [questions, setQuestions] = useState();
    const [activeIndex, setActiveIndex] = useState(0);
    const [webcamOpen, setWebCamOpen] = useState(false);
    const getInterviewDetails = async () => {
        const resp = await db.select().from(MockInterview).where(
            eq(MockInterview.mockId, params.id)
        )

        console.log(resp);
        setInterview(resp[0]);
        setQuestions(JSON.parse(resp[0].jsonResponse));
    }

    useEffect(() => {
        getInterviewDetails();
    }, [params])

    return (
        <div>
            <h1 className=' text-2xl md:text-3xl font-bold'>Start your Mock Interview...</h1>

            <div className='md:grid mt-5  md:grid-cols-2 gap-10'>
                
                <RecordAnswer Questions={questions} interview={interview} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

                <Questions Questions={questions} interview={interview} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

            </div>
        </div>
    )
}

export default Start