"use client";
import React, { useEffect, useState } from "react";
import { LightbulbIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CircleStop } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
function Questions({ Questions, activeIndex, interview, setActiveIndex }) {
    // const [selected, setSelected] = useState(0);

    useEffect(() => {
        console.log(Questions);
    }, [Questions]);

    return (
        <div className="mt-5 md:mt-0 flex flex-col justify-start">
            <div className="border-[1px] flex flex-col justify-between border-neutral-800 p-4 rounded-lg bg-neutral-900">
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {!Questions
                        ? [1, 2, 3, 4, 5].map((e, i) => {
                            return (
                                <div
                                    key={i}
                                    className="p-6 rounded-full dark:bg-neutral-700 animate-pulse"
                                ></div>
                            );
                        })
                        : ""}
                    {Questions?.map((question, index) => (
                        <h3
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={` text-xs md:text-lg p-2 transition-all duration-100  text-center cursor-pointer rounded-full ${activeIndex === index
                                ? `dark:bg-orange-500`
                                : `dark:text-black dark:bg-white`
                                } `}
                        >
                            Question #{index + 1}
                        </h3>
                    ))}
                </div>

                <div className="mt-10 mb-10 text-base md:text-lg">
                    {!Questions ? (
                        <>
                            <div className="p-3 mb-2 bg-neutral-700 rounded-xl animate-pulse "></div>
                            <div className="p-3  bg-neutral-700 rounded-xl animate-pulse "></div>
                        </>
                    ) : (
                        ""
                    )}
                    {Questions ? Questions[activeIndex].question : ""}
                </div>
                {!Questions ? (
                    <div className="p-16 dark:bg-neutral-700 rounded-lg animate-pulse"></div>
                ) : (
                    ""
                )}

                {Questions && (
                    <div className="bg-orange-500 p-5 mt-4 rounded-lg">
                        <div className="flex mb-1">
                            <LightbulbIcon />
                            Note:
                        </div>
                        {process.env.NEXT_PUBLIC_NOTE}
                    </div>
                )}
            </div>
            <div className="mt-5">
                <AlertDialog>
                    <AlertDialogTrigger asChild>

                        <Button variant="destructive"> <CircleStop className="mr-2" /> End Interview</Button>

                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-red-600">Are you sure you want to end this interview?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will lead you to the feedback section where you can find the results of the interview.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>

                            <AlertDialogAction>
                                <Link href={`/interview/${interview?.mockId}/feedback`}>
                                    Continue
                                </Link>
                            </AlertDialogAction>

                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>


            </div>
        </div >
    );
}

export default Questions;
