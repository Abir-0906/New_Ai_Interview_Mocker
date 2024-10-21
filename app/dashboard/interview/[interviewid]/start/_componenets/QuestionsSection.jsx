import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionsSection({mockInterviewQuestion,activeQuestionIndex}) {


const textToSpeach=(text)=>{
  if('speechSynthesis' in window){
    const speech=new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  }else{
    alert('Sorry, your browser does not support speech to text')
  }
}


  return mockInterviewQuestion&&(
    <div className='p-5 border rounded-lg my-10'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
      
        {mockInterviewQuestion&&mockInterviewQuestion.map((question,index)=>(
            <h2 className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer'
            ${activeQuestionIndex==index&&'bg-black text-white'}`}
            > Question #{index+1}</h2>
        ))}
        
      </div>
      <h2 className='my-5 text-sm md:text-lg'>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>

      <Volume2 onClick={()=>textToSpeach(mockInterviewQuestion[activeQuestionIndex]?.question)}/>
      <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
        <h2 className='flex gap-2 items-center text-blue-500'>
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className='text-sm text-blue-400 my-2'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
      </div>
    </div>
  )
}

export default QuestionsSection