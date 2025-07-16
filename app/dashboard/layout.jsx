"use client"
import React, { useState } from 'react'
import Header from './_components/Header';
import SideBar from './_components/SideBar';
import { UserCourseListContext } from '../_context/UserCourseList';
import { useUser } from '@clerk/nextjs';

function DashboardLayout({children}) {
  
  const [userCourseList,setUserCourseList] = useState([]);
  const {user} = useUser();

   return (

    

    <UserCourseListContext.Provider value = {{userCourseList,setUserCourseList}}>
    <div> 

         <div className='md:w-64 hidden md:block'> 
            <SideBar/>
         </div>
    <div className='md:ml-64'>
        <Header/>

        <div className = 'p-10'> 
            {children}
        </div>
      
    </div>
   
    </div>

     </UserCourseListContext.Provider>
  )
}

export default DashboardLayout;