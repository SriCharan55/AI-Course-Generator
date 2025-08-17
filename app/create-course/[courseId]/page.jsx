
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { Chapters } from "@/configs/schema";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import LoadingDialog from "../_components/LoadingDialog";
import { generateChapterContent_AI } from "@/configs/AiModel";
import service from "@/configs/service";


function CourseLayout() {
  const params = useParams(); // ✅ use this instead of props
  const { user } = useUser();

  const [course, setCourse] = useState([]);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (params?.courseId && user?.primaryEmailAddress?.emailAddress) {
      GetCourse();
    }
  }, [params, user]);


  const GetCourse = async () => {

    const result = await db.select().from(CourseList)
      .where(and(eq(CourseList.courseId, params?.courseId),
        eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)))

    setCourse(result[0]);
    console.log(result);
  }

  const GenerateChapterContent = async () => {
    const chapters = course?.courseOutput?.chapters;
    if (!chapters || chapters.length === 0) return;

    setLoading(true); // Start loading before loop

    for (const [index, chapter] of chapters.entries()) {
      //if (index < 3) {
        const PROMPT =
          'Explain the concept in Detail on Topic: ' +
          course?.name +
          ', Chapter:' +
          chapter?.chapterName +
          ', in JSON Format with list of array with field as title, explanation on given chapter in detail, Code Example (Code field in <precode> format) if applicable';

        console.log(PROMPT);

        try {
             
          let videoId='';

          //Genearte Video URL

           service.getVideos(course?.name+ ':' +chapter?.chapterName).then(resp=>{
            console.log(resp);
            videoId=resp[0]?.id?.videoId
          })

          const result = await generateChapterContent_AI(PROMPT);
          console.log(`✅ Chapter ${index + 1} AI Result:`, result);

          const content = result;

         
          //Save Chapter Content + Video URL
          await db.insert(Chapters).values({
               chapterId:index,
               courseId:course?.courseId,
               content:content,
               videoId:videoId
            
          })

          setLoading(false);

          // TODO: Save result to DB or state
        } catch (e) {
          console.error(`❌ Error in Chapter ${index + 1}:`, e);
           setLoading(false);
        //} 

          
        await db.update(CourseList).set({
          publish:true
        })

         
      }
    }

    setLoading(false); // Done after all
    router.replace('/create-course/'+course?.courseId+"/finish");
  };


  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2x1">Course Layout</h2>


      <LoadingDialog loading={loading} />

      <CourseBasicInfo course={course} refreshData={() => GetCourse()} />
      <CourseDetail course={course} />
      <ChapterList course={course} refreshData={() => GetCourse()} />
      <Button onClick={GenerateChapterContent}
        variant="custom"
        className="bg-[#875bf9] text-white my-10"
      >
        Generate Course Content
      </Button>

    </div>
  )
}

export default CourseLayout