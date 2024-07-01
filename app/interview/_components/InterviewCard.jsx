import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
function InterviewCard({ interview, key }) {
    return (
        <div className='rounded-lg dark:bg-neutral-900 p-4 md:p-5 dark:border-2 flex flex-col border-neutral-800'>
            <div>
                <h1 className='my-1 font-semibold md:text-xl'>{interview.jobPosition}</h1>
                <h1 className='my-1 md:text-base text-sm '>{interview.jobExperience} years of Experience</h1>
                <h1 className='my-1  md:text-base text-sm text-neutral-400'>Created At: {interview.createdAt}</h1>
            </div>

            <div className='flex gap-4 mt-2 justify-between'>
                <Link className='w-full' href={'/interview/' + interview.mockId + '/feedback'}>
                    <Button className='w-full '>Feedback</Button>
                </Link>

                <Link className='w-full' href={'/interview/' + interview.mockId}>
                    <Button className='w-full' >Start</Button>
                </Link>


            </div>
        </div>
    )
}

export default InterviewCard