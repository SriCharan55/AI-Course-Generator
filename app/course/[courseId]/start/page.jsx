"use client"
import { db } from '@/configs/db'
import { Chapters, CourseList } from '@/configs/schema'
import { and, eq } from 'drizzle-orm'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ChapterListCard from './_components/ChapterListCard'
import ChapterContent from './_components/ChapterContent'

function CourseStart() {

    const params = useParams();

    const [course, setCourse] = useState();

    const [selectedChapter, setSelectedChapter] = useState();

    const [chapterContent,setChapterContent] = useState();

    useEffect(() => {

        GetCourse();


    }, [])

    //used to get course info by courseId
    const GetCourse = async () => {
        const result = await db.select().from(CourseList)
            .where(eq(CourseList?.courseId, params?.courseId));



        setCourse(result[0]);
        
        GetSelectedChapterContent(0);

    
    }

    const GetSelectedChapterContent=async(chapterId)=>{

        const result = await db.select().from(Chapters)
        .where(and(eq(Chapters.chapterId,chapterId),
        eq(Chapters.courseId,course?.courseId)))

        console.log(result);

            setChapterContent(result[0]);

    }

    
    return (
        <div>
            {/* Chapter List SideBar*/}
            <div className='fixed md:w-72 hidden md:block  h-screen border-r shadow-sm '>
                <h2 className='font-medium text-lg bg-[#875bf9] p-4 text-white'>{course?.courseOutput?.courseName}</h2>
                <div>
                     {course?.courseOutput?.chapters.map((chapter, index) => (
                        <div
                            key={index}
                            className={`cursor-pointer hover:bg-purple-50 ${
                                selectedChapter?.chapterName === chapter?.chapterName
                                    ? 'bg-purple-100'
                                    : ''
                            }`}
                            onClick={() => {
                                setSelectedChapter(chapter);
                                GetSelectedChapterContent(index);
                            }}
                        >
                            <ChapterListCard chapter={chapter} index={index} />
                        </div>
                    ))}
                </div>
            </div>
            {/* Content div*/}
            <div className='md:ml-72'>
              <ChapterContent chapter = {selectedChapter}
              content = {chapterContent}/>
            </div>
        </div>
    )
}

export default CourseStart