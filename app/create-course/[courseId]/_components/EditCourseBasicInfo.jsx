"use client";
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiPencilSquare } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { db } from '@/configs/db';
import { eq } from 'drizzle-orm';
import { CourseList } from '@/configs/schema';

function EditCourseBasicInfo({ course, refreshData }) {
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (course?.courseOutput) {
      setCourseName(course.courseOutput.courseName || "");
      setDescription(course.courseOutput.description || "");
    }
  }, [course]);

  const onUpdateHandler = async () => {
    course.courseOutput.courseName = courseName;
    course.courseOutput.description = description;

    const result = await db
      .update(CourseList)
      .set({ courseOutput: course.courseOutput })
      .where(eq(CourseList.id, course.id))
      .returning({ id: CourseList.id });

    console.log("✅ Updated Course:", result);
    refreshData(true);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <HiPencilSquare />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course Info</DialogTitle>
          <DialogDescription>
            Update the course title and description.
          </DialogDescription>
        </DialogHeader>

        {/* Input Fields */}
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium">Course Title</label>
            <Input
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <Textarea
              className="h-40"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="custom"
              className="bg-[#875bf9] text-white"
              onClick={onUpdateHandler}
            >
              Update
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditCourseBasicInfo;

