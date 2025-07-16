"use client";
import React, { useEffect, useState, useContext } from 'react';
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { HiLightBulb } from "react-icons/hi";
import { HiClipboardDocumentCheck } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import SelectCategory from './_components/SelectCategory';
import TopicDescription from './_components/TopicDescription';
import SelectOption from './_components/SelectOption';
import { UserInputContext } from '../_context/UserInputContext';
import { generateCourseLayout_AI } from "@/configs/AiModel"; //
import LoadingDialog from './_components/LoadingDialog';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import uuid4 from 'uuid4';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';


function CreateCourse() {
    const StepperOptions = [
        {
            id: 1,
            name: 'Category',
            icon: <HiMiniSquares2X2 />,
        },
        {
            id: 1,
            name: 'Topic & Desc',
            icon: <HiLightBulb />,
        },
        {
            id: 1,
            name: 'Options',
            icon: <HiClipboardDocumentCheck />,
        },
    ];

    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
    const [loading, setLoading] = useState(false);

    const [activeIndex, setActiveIndex] = useState(0);

    const { user } = useUser();

    const router = useRouter();

    useEffect(() => {
        console.log(userCourseInput);

    }, [userCourseInput])
    //used to check the button is enabled ,disabled status
    const checkStatus = () => {
        if (userCourseInput?.length == 0) {
            return true;
        }
        if (activeIndex == 0 && (userCourseInput?.category?.length == 0 || userCourseInput?.category == undefined)) {
            return true;
        }
        if (activeIndex == 1 && (userCourseInput?.topic?.length == 0 || userCourseInput?.topic == undefined)) {
            return true;
        }
        else if (activeIndex == 2 && (userCourseInput?.level?.length == 0 || userCourseInput?.duration == undefined || userCourseInput?.displayVideo == undefined || userCourseInput?.noOfChapters == undefined)) {
            return true;
        }
        return false;
    }

    const GenerateCourseLayout = async () => {
        setLoading(true);

        const BASIC_PROMPT = `
Generate a Course Tutorial in JSON format with fields:
"courseName", "description", "duration", "category", "topic", "level", "noOfChapters", 
and "chapters" (array of { chapterName, about, duration }).
DO NOT include markdown, explanation, or anything except pure JSON.
`;

        const USER_INPUT_PROMPT = `Category: ${userCourseInput?.category}, Topic: ${userCourseInput?.topic}, Level: ${userCourseInput?.level}, Duration: ${userCourseInput?.duration}, NoOfChapters: ${userCourseInput?.noOfChapters}`;

        const FINAL_PROMPT = `${BASIC_PROMPT} ${USER_INPUT_PROMPT}`;
        try {
            const result = await generateCourseLayout_AI(FINAL_PROMPT); // 🟩 returns parsed object already
            console.log("✅ Raw Result:\n", result);

            // If you really want to mimic `.response.text()`:
            // Convert back to JSON string for logging
            const jsonStr = JSON.stringify(result, null, 2);
            console.log(jsonStr);

            // Save and redirect
           
            await SaveCourseLayoutInDb(result);
        } catch (error) {
            console.error("❌ Error from Gemini:", error);
        }

        setLoading(false);
    };


    const SaveCourseLayoutInDb = async (courseLayout) => {
        var id = uuid4();
        setLoading(true);
        const result = await db.insert(CourseList).values({
            courseId: id,
            name: userCourseInput?.topic,
            level: userCourseInput?.level,
            category: userCourseInput?.category,
            courseOutput: courseLayout,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName,
            userProfileImage: user?.imageUrl


        })

        console.log("finish");

        setLoading(false);
        router.replace('/create-course/' + id);
    }



    return (
        <div>
            <div className='flex flex-col justify-center items-center mt-10'>
                <h1 className='text-4xl text-[#875bf9] font-medium'>Create  Course</h1>
                <div className='flex mt-10'>
                    {StepperOptions.map((items, index) => (
                        <div className='flex items-center' key={index}>
                            <div className='flex flex-col items-center w-[50px] md:w-[100px]'>
                                <div className={`bg-gray-200 p-3 rounded-full text-white
                             ${activeIndex >= index && 'bg-purple-500 '}`}>
                                    {items.icon}
                                </div>
                                <h2 className='hidden md:block md:text-sm'>{items.name}</h2>
                            </div>
                            {index != StepperOptions?.length - 1 &&
                                <div className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300
                    ${activeIndex - 1 >= index && 'bg-purple-500'}`}> </div>}
                        </div>
                    ))}
                </div>
            </div>

            <div className='px-10 md:px-20 lg:px-44 mt-10'>

                {activeIndex === 0 ? <SelectCategory /> :
                    activeIndex === 1 ? <TopicDescription /> :
                        <SelectOption />}

                <div className='flex justify-between mt-10'>
                    <Button disabled={activeIndex === 0} variant="outline"
                        onClick={() => setActiveIndex(activeIndex - 1)} > Previous </Button>

                    {activeIndex < 2 && <Button disabled={checkStatus()} variant="custom" className="bg-[#875bf9] text-white"
                        onClick={() => setActiveIndex(activeIndex + 1)}> Next </Button>}

                    {activeIndex === 2 && <Button disabled={checkStatus()} variant="custom" className="bg-[#875bf9] text-white"
                        onClick={() => GenerateCourseLayout()}> Genearate Course Layout </Button>}
                </div>
            </div>

            <LoadingDialog loading={loading} />



        </div>
    )
}

export default CreateCourse;
