"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
import { Label } from "@/components/ui/label"
import { chatSession } from '../Utils/GeminiAIModel'
import { LoaderCircle } from 'lucide-react';
import { db } from '@/db/db'
import { MockInterview } from '@/db/schema'
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment'
import { useUser } from '@clerk/nextjs'
import InterviewList from './_components/InterviewList'
import { useRouter } from 'next/navigation'
function Interview() {

    const [jobName,setJobName] = useState();
    const [jobDesc,setDesc] = useState();
    const [exp,setExp] = useState();
    const [loading,setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const {user} = useUser();
    const Router = useRouter();
    const createInterview = async(e) => {
        setLoading(true)
        e.preventDefault();
        console.log({jobName, jobDesc, exp});
        const prompt = `Job Role: ${jobName}, Tech Stack: ${jobDesc}, Experience: ${exp} years. Give 5 interview questions based on these description and level of experience in json format with answers. And dont use any special symbols in the response`
        const result = await chatSession.sendMessage(prompt);
        const MockResult = (result?.response.text()).replace("```json","").replace("```","");
        // console.log(MockResult);
        const parsedResult = JSON.parse(MockResult);
        console.log(parsedResult);
        if(MockResult)
        {
          const resp = await db.insert(MockInterview).values({
            mockId: uuidv4(),
            jobPosition:jobName,
            jobDesc: jobDesc,
            jobExperience: exp,
            jsonResponse: MockResult,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD-MM-YYYY'),
          }).returning({mockId: MockInterview.mockId});

          console.log("Inserted ID:",resp);
          if(resp)
            {
              setOpenDialog(!openDialog);
              Router.push(`/interview/${resp[0].mockId}`)
            }
          
        }
        setLoading(false);
    }

  return (
    <div>
      <h1 className='font-bold text-2xl md:text-4xl'>Mock Interview</h1>

      <div onClick={()=>setOpenDialog(true)} className=' mt-3 text-lg cursor-pointer w-max hover:bg-neutral-800 transition-all duration-100 font-semibold border-dashed bg-neutral-900 text-center rounded-xl py-2 px-5  md:py-6 md:px-24 border-2'>
            Add New +
          </div>
      <Dialog open={openDialog} closeHidden={false} >   
      <DialogTrigger>
      </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] p-7">
          <DialogHeader>
            <DialogTitle>Tell us more about your interview</DialogTitle>
            <DialogDescription>
              Add details about your Job, Job description, Your role and years of Experience
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col  gap-4 py-4"  >
            <div className="flex flex-col gap-2">
              <Label htmlFor="role" className="">
                Job Role / Job Position
              </Label>
              <Input
                id="role"
                // defaultValue="Pedro Duarte"
                placeholder="eg. Full Stack Developer"
                className="col-span-3"
                name='role'
                required
                onChange={(e)=>setJobName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="desc" className="">
                Job Description / Tech Stack (in short)
              </Label>
              <Textarea
                id="desc"
                name="desc"
                placeholder="eg. React JS, NodeJS, Angular "
                className="col-span-3"
                required
                onChange={(e)=>setDesc(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="years" className="">
                Years of Experience
              </Label>
              <Input
                id="name"
                placeholder='eg. 3'
                type='number'
                name="exp"
                className="col-span-3"
                required
                onChange={(e)=>setExp(e.target.value)}
              />
            </div>
          
          <DialogFooter>
          <Button type='btn' onClick={()=>
            {
              setOpenDialog(!openDialog);
            setLoading(false);}
            }
             variant='ghost' >Cancel</Button>
            <Button type="submit" disabled={loading || !(jobName && jobDesc && exp) } onClick={createInterview} >
              {
                loading?
                <>
                
                 <LoaderCircle size={20} className='animate-spin'  /> 
                 <span className='ml-1'>
                  Generating Questions
                  </span>
                 </>
                 : 'Start Interview'
              }
             
              </Button>
              
          </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

        <InterviewList/>
      
    </div>
  )
}

export default Interview