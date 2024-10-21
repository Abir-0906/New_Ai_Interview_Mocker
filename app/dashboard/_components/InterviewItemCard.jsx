import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import React from 'react'

function InterviewItemCard({interview}) {
    const router=useRouter();

    const onStart=()=>{
        router.push('/dashboard/interview/'+interview?.mockId)
    }
    const onFeedback=()=>{
        router.push('/dashboard/interview/'+interview?.mockId+"/feedback")
    }
  return (
    <div className='border shadow-sm rounded-lg p-3'>
       <h2 className='font-bold text-blue-300'>{interview?.jobPostion}</h2>
       <h2 className='text-sm text-gay-300'>{interview?.jobExperience}Years Of experience</h2>
       <h2>Created at:{interview.CreatedAt}</h2>
       <div className='flex justify-between gap-5'>
       
        <Button onClick={onFeedback} size='sm' variant='outline' className='w-full'>Feedback</Button>
        
        <Button onClick={onStart} size='sm' className='w-full'>Start</Button>

       </div>
    </div>
  )
}

export default InterviewItemCard
