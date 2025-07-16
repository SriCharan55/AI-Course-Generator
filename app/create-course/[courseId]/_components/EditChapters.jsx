"use client";

import React, { useEffect, useState } from "react";
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
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";
import { CourseList } from "@/configs/schema";

function EditChapters({ course, index, refreshData }) {
  const chapters = course?.courseOutput?.chapters || [];

  if (!chapters[index]) return null;

  const [chapterName, setChapterName] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    setChapterName(chapters[index]?.chapterName || "");
    setAbout(chapters[index]?.about || "");
  }, [course, index]);

  const onUpdateHandler = async () => {
    if (!course?.courseId) {
      console.error("❌ courseId missing, cannot update");
      return;
    }

    // ✅ Update specific chapter in local object
    course.courseOutput.chapters[index].chapterName = chapterName;
    course.courseOutput.chapters[index].about = about;

    // ✅ Safely update DB where courseId matches
    const result = await db
      .update(CourseList)
      .set({
        courseOutput: course.courseOutput,
      })
      .where(eq(CourseList.courseId, course.courseId))
      .returning();

    console.log("✅ Updated course:", result);
    refreshData(true);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <HiPencilSquare />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Chapter</DialogTitle>
          <DialogDescription>Update the chapter details below.</DialogDescription>
        </DialogHeader>

        {/* Content outside DialogDescription to avoid hydration error */}
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium">Chapter Name</label>
            <Input
              value={chapterName}
              onChange={(e) => setChapterName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <Textarea
              className="h-40"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
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

export default EditChapters;
