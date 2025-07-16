"use client";
import { UserCourseListContext } from '@/app/_context/UserCourseList';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs'
import Link from 'next/link';
import React, { useContext } from 'react'

function AddCourse() {
  const { user } = useUser();
  const {userCourseList,setUserCourseList}=useContext(UserCourseListContext);
  return (
    <div className='flex justify-between items-center'>
      <div>
        <h2 className='text-3xl'>Hello,
          <span className='font-bold'>{user?.fullName}</span>
        </h2>
        <p className='text-sm text-gray-500'> Create a new course with AI ,Share with friends and Earn from it</p> 
      </div>
      <Link href={userCourseList>=5?'/dashboard/upgrade' : '/create-course'}>
      <Button variant="custom" className=' bg-[#875bf9] text-white'>+ Create AI Course</Button>
      </Link>
    </div>
  )
}

export default AddCourse