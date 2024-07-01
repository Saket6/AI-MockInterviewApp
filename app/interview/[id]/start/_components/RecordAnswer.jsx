import React, { useEffect, useState } from "react";
import Image from "next/image";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
import { Volume2 } from "lucide-react";
import { Disc2 } from "lucide-react";
import { Mic } from "lucide-react";
import { db } from "@/db/db";
import { UserAnswer } from "@/db/schema";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { chatSession } from "@/app/Utils/GeminiAIModel";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
function RecordAnswer({ Questions, activeIndex, setActiveIndex, interview }) {
    const { toast } = useToast();
    const { user } = useUser();
    const [answer, setAnswer] = useState("");
    const [activeQuestionIndex, setIndex] = useState(0);
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    const SaveAns = async () => {
        if (listening) {
            setTimeout(async () => {
                SpeechRecognition.stopListening();
                resetTranscript();
                if (answer.length < 10) {
                    toast({
                        title: "Couldn't Save your answer. Please try again.",
                        description: "Please elaborate your answer.",
                    });
                    return;
                }

                const prompt =
                    "Question: " +
                    Questions[activeIndex].question +
                    "Student's Answer:" +
                    answer +
                    "Judge the following answer as per the provided question and give the rating out of 10 and some areas of improvement in 2-3 lines in json format having fields as 'rating', 'studentAnswer' and 'feedback'(remember to follow the casing for the field names). As the user is giving answers through speech to text there may be errors in spelling. Try to guess the user answer's unrecognised words which is related to the specific question.";
                const result = await chatSession.sendMessage(prompt);
                const Feedback = result?.response
                    .text()
                    .replace("```json", "")
                    .replace("```", "");
                const jsonFeedback = JSON.parse(Feedback);
                console.log(jsonFeedback);

                //save to db
                const resp = await db.insert(UserAnswer).values({
                    mockIdRef: interview.mockId,
                    question: Questions[activeIndex].question,
                    correctAnswer: Questions[activeIndex].answer,
                    userAnswer: answer,
                    feedback: jsonFeedback.feedback,
                    rating: jsonFeedback.rating,
                    userEmail: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format("DD-MM-YYYY")

                })

                if (resp) {
                    console.log("Answer Recorded Successfully");
                    toast({ description: "Answer Recorded Successfully" });
                }
            }, [2000]);



        } else {
            SpeechRecognition.startListening();
        }
    };

    useEffect(() => {
        setAnswer(transcript);
    }, [transcript]);
    // if (!browserSupportsSpeechRecognition) {
    //     return <span>Browser doesnt support speech recognition.</span>;
    // }

    return (
        <div className="flex flex-col justify-center p-5 items-center bg-neutral-900 rounded-lg">
            <div className="flex justify-center items-center md:mt-0 mt-5">
                {/* <Image
                    src="/images/webcam.png"
                    className="absolute"
                    alt=""
                    height={300}
                    width={300}
                /> */}
                <Webcam style={{}} className="rounded-lg" mirrored />
            </div>


            {listening ? (
                <Button className="flex mt-6 p-6 " onClick={SaveAns}>
                    <Mic color="red" />
                    <span
                        className="ml-1  text-red-600 font-semibold"
                        onClick={() => console.log(answer)}
                    >
                        Stop Listening
                    </span>
                </Button>
            ) : (
                <Button className="mt-6 p-6 font-semibold" onClick={SaveAns}>
                    <Disc2 className="mr-2" />
                    Record Answer
                </Button>
            )}
        </div>
    );
}

export default RecordAnswer;
