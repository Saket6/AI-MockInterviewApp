"use client"
import { useUser } from '@clerk/nextjs'
import { db } from '@/db/db';
import { MockInterview } from '@/db/schema';
import { eq, desc, asc } from 'drizzle-orm';
import { useState, useEffect } from 'react';
import InterviewChart from './_components/InterviewChart';
import { UserAnswer } from '@/db/schema';
import React from 'react'

function Dashboard() {

  const { user } = useUser();

  const [interviewList, setInterviewList] = useState();
  const [data, setData] = useState();
  const getInterviewList = async () => {
    const result = await db.select().from(MockInterview).where(
      eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)).orderBy(
        asc(MockInterview.id)
      )

    setInterviewList(result);

    console.log(result);
  }

  const getQuestions = async () => {
    let data = [];

    
    if(interviewList)
    for (let i = 0; i < interviewList.length; i++) {
      const results = await db.select().from(UserAnswer).where(
        eq(interviewList[i].mockId, UserAnswer.mockIdRef)
      );

      let totalRating = 0;
      let totalAnswered = 0;
      results?.forEach(result => {
        totalRating += parseInt(result.rating);
        totalAnswered++;
      });

      // console.log(totalRating, "Total Rating");
      const avgRating = Math.round(totalRating / totalAnswered);

      data.push({ 'dateCreated': interviewList[i].createdAt, 'rating': avgRating });

      
    }
    setData(data);
    console.log(data, "This is data");

  }

  useEffect(() => {
    user && getInterviewList();
  }, [user])

  useEffect(() => {
    getQuestions();
  }, [interviewList])


  return (
    <div>
      <h1 className=' text-2xl md:text-4xl font-bold'>
        Hello, {user?.fullName} 👋
      </h1>

      <h1 className='mt-4 text-xl md:text-2xl mb-4'>Your Previous Performances</h1>

      {
        data?.length > 0 && <InterviewChart data={data} />
      }
    </div>
  )
}

export default Dashboard