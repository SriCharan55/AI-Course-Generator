import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import React, { useContext } from 'react'; 
import { Textarea } from '@/components/ui/textarea'
import { UserInputContext } from '@/app/_context/UserInputContext';


function TopicDescription() {

  const {userCourseInput,setUserCourseInput} = useContext(UserInputContext);

     const handleInputChange=(feildName,value)=>{
      setUserCourseInput(prev=>({
        ...prev,
        [feildName]:value
      }))

     }
  return (
    <div className ='mx-20 lg:mx-44'>
        {/* Input Topic */}

       

        <div className='mt-5'>
            <label className='text-lg font-medium'>           💡 Write the topic for which you want to generate a course(eg:c,java,yoga etc..) </label>
            <Input placeholder={'Topic'} className='h-14 text-xl' 
            defaultValue = {userCourseInput?.topic}
            onChange={(e)=>handleInputChange('topic',e.target.value)} />
        </div>

        <div className='mt-5'>
            <label > 📝 Tell us more about your course , what you want to include in the course (Optional)</label>
            <Textarea placeholder={'About your course '} className='h-14 text-xl' 
            defaultValue = {userCourseInput?.description}
            onChange={(e)=>handleInputChange('description',e.target.value)} />
        </div>
         {/* Text Area Desc */}
    </div>
  )
}

export default TopicDescription