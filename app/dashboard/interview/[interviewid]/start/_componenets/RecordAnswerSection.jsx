"use clinet"
import   Webcam  from 'react-webcam'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAiModal'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { db } from '@/utils/db'

function RecordAnswerSection({mockInterviewQuestion,activeQuestionIndex,interviewData}) {
    const[userAnswer,setUserAnswer]=useState('');
    const user=useUser();
    const[loading,setLoading]=useState(false);
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });

      useEffect(()=>{
  results.map((results)=>(
    setUserAnswer(prevAns=>prevAns+results?.transcript)
  ))
      },[results])

      useEffect(()=>{
if(!isRecording&&userAnswer.length>10)
{
    UpdateUserAnswer();
}

      },[userAnswer])

  const StartStopRecording=async()=>{
    if(isRecording){
        
        stopSpeechToText();
    }
      else{
        startSpeechToText();
    }
  }

  const UpdateUserAnswer=async()=>{
    console.log(userAnswer);
    setLoading(true);
    const feedbackPrompt="Question:"+mockInterviewQuestion[activeQuestionIndex]?.question+
    ",User Answer:"+userAnswer+",Depends on question and user answer for given interview question"+
    
    "please gives us rating for user answer"+
    "in just 3 to 5 lines to imporve it in Json Format with rating field and feedback field";
   
    const result= await chatSession.sendMessage(feedbackPrompt);
    const mockJsonResp=(result.response.text()).replace('```json','').replace('```','');
    console.log(mockJsonResp);
    const jsonFeedbackResp=JSON.parse(mockJsonResp);

   const resp=await db.insert(UserAnswer)
   .values({
    mockIdRef:interviewData?.mockId,
    question:mockInterviewQuestion[activeQuestionIndex]?.question,
    correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer,
    userAns:userAnswer,
    feedback:jsonFeedbackResp?.feedback,
    rating:jsonFeedbackResp?.rating,
    userEmail:user?.primaryEmailAddress?.emailAddress,
    createdAt:moment().format('DD-MM-yyyy')
   })

   if(resp){
    toast('User Answer recorded successfully')
    setUserAnswer('');
    setResults([]);
   }
   setResults([]);
   setLoading(false);
}
return (
    <div  className='flex items-center justify-center flex-col'>
    <div className='flex flex-col my-20 justify-cente items-center bg-black  rounded-lg p-5'>
        <Image src={'/Webcam.png'} width={100} height={100}
        classname ='absolute'/>
      <Webcam
      mirrored={true}
      style={{
        height:300,
        width:'100%',
        zIndex:10,

      }}
      />
    </div>
    
    <Button 
    variant="outline" className='my-4'
    onClick={StartStopRecording}
    >
        
        {isRecording?
        <h2 className='text-red-600 flex gap-2 '>
            <Mic/>'Stop Recording'
            </h2>
            :
            'Record Answer'}</Button>
            

      
    
    </div>
  )
  }

  


export default RecordAnswerSection
