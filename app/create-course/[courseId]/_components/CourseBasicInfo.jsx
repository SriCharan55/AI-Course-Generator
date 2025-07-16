"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiOutlinePuzzle } from "react-icons/hi";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import { supabase } from "@/configs/supabaseConfigs";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

function CourseBasicInfo({ course, refreshData,edit = true }) {
  const [uploadedUrl, setUploadedUrl] = useState("");

  // ✅ On first render, use courseBanner as image
  useEffect(() => {
    setUploadedUrl(course?.courseBanner || "/placeholder.png");
  }, [course]);

  const onFileSelected = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileName = `course-photo/${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("course-images")
      .upload(fileName, file);

    if (error) {
      console.error("❌ Upload failed:", error.message);
    } else {
      const { data: urlData } = supabase.storage
        .from("course-images")
        .getPublicUrl(fileName);

      const publicUrl = urlData?.publicUrl;
      setUploadedUrl(publicUrl); // 👈 Update local UI

      // ✅ Update courseBanner in the DB
      const result = await db
        .update(CourseList)
        .set({ courseBanner: publicUrl })
        .where(eq(CourseList.id, course.id))
        .returning({ id: CourseList.id });

      console.log("✅ Image URL saved to DB:", result);
      refreshData(true); // re-fetch course info
    }
  };

  return (
    <div className="p-10 border rounded-xl shadow-sm mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <h2 className="font-bold text-3xl">
            {course?.courseOutput?.courseName}
            {edit&&<EditCourseBasicInfo
              course={course}
              refreshData={() => refreshData(true)}
            />}
          </h2>
          <p className="text-sm text-gray-400 mt-3">
            {course?.courseOutput?.description}
          </p>
          <h2 className="font-medium mt-2 flex gap-2 items-center text-[#875bf9]">
            <HiOutlinePuzzle />
            {course?.category}
          </h2>

          {!edit && <Link href = {'/course/'+course?.courseId+"/start"} >
          <Button variant="custom" className="w-full bg-[#875bf9] text-white mt-5">
            Start
          </Button>
          </Link>}

        </div>

        <div>
          <label htmlFor="upload-image">
            <Image
              src={uploadedUrl || "/placeholder.png"} // ✅ fallback if uploadedUrl is empty
              width={300}
              height={300}
              alt="Course Image"
              className="w-full rounded-xl h-[250px] object-cover cursor-pointer"
            />

          </label>
          {edit && <input
            type="file"
            id="upload-image"
            className="opacity-0"
            onChange={onFileSelected}
          />}
        </div>
      </div>
    </div>
  );
}

export default CourseBasicInfo;


