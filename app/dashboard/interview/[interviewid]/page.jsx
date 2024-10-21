"use client"
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam';

function Interview({params}) {

    const[interviewData,setInterviewData]=useState();
    const[webCamEnable,setWebCamEnable]=useState(false);
    useEffect(()=>{
        console.log(params.interviewid);
        GetIvDetails();
    },[])
 
    const GetIvDetails=async()=>{
        const result=await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId,params.interviewid))
       console.log(result)
       setInterviewData(result[0]);
    }
  return (
    <div className='my-10 flex justify-center flex-col items-center'>
      <h2 className='font-bold text-2xl'>Lets get  Started</h2>
      <div className='grid grid-cols-1 md;grid-cols-2 gap-10'>
      <div>
        {webCamEnable?<Webcam onUserMedia={()=>setWebCamEnable(true)}
        onUserMediaError={()=>setWebCamEnable(false)}
        mirrored={true}
         style={{height:300,width:300}}/>:
         <>
        <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-g border'/>
        <Button  variant='ghost' onClick={()=>setWebCamEnable(true)}> Enable Web Cam and Microphone</Button>
        </>
        }
        </div>
      </div>

        <div className='p-5 my-7 border rounded-lg border-yellow-300 bg-yellow-100'>
        <h2 className='flex gap-2 items-center text-yellow-500'> <Lightbulb/><strong>Information</strong></h2>
        <h2 className='mt-3 text-yellow-500' >{process.env.NEXT_PUBLIC_INFORMATION}</h2>
           
        </div>
        <Link href={'/dashboard/interview/'+params.interviewid+'/start'}>
     <Button  className='my-5'>Start Interview</Button>
     </Link>
    </div>
  )
}

export default Interview
