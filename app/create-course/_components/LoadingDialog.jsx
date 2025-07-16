import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from 'next/image';

function LoadingDialog({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Loading Course</AlertDialogTitle>
          <div className="flex flex-col items-center py-10">
            <Image src="/loader.gif" width={100} height={100} alt="Loading..." />
            <p className="mt-4 text-center text-muted-foreground text-sm">
              Please Wait... Ai is Working on your course
            </p>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LoadingDialog;
