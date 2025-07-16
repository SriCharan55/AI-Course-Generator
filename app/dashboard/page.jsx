import { UserButton } from '@clerk/nextjs';
import React from 'react'
import AddCourse from './_components/AddCourse';
import { UserCheck2Icon } from 'lucide-react';
import UserCourseList from './_components/UserCourseList';

function Dashboard() {
  return (
    <div>

     {/* <UserButton/> */}

     <AddCourse/>

    {/* Display List of Course */}
   <UserCourseList />
    </div>
  )
}

export default Dashboard;