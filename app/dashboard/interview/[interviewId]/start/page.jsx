"use client";
import { db } from "@/utils/db";
import { MockInterview ,UserAnswer} from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useRouter } from 'next/navigation';

import  {checkAndAssignBadge} from "@/lib/utils"
import { useUser } from "@clerk/nextjs";


import { useCallback } from "react";
import { debounce } from "lodash";


const StartInterview = ({ params }) => {
  const router = useRouter();
  const {user} = useUser()

    // function to store over all rating
    async function updateOverallRating(mockInterviewId) {
      try {
        console.log("updating over all rating:",mockInterviewId)
          // Fetch user answers for the given mockInterviewId
          
          const userAnswers = await db.select()
              .from(UserAnswer)
              .where(eq(UserAnswer.mockIdRef, mockInterviewId));

          console.log(userAnswers)

              
          
          if (userAnswers.length === 0) {
              console.log(`No user answers found for MockInterview ID ${mockInterviewId}`);
              return;
          }
          
          // Calculate the average rating
          const totalRating = userAnswers.reduce((sum, answer) => sum + (parseInt(answer.rating) || 0), 0);
          const averageRating = Math.round(totalRating / userAnswers.length);
          
          // Update the overallRating where id matches mockInterviewId
          await db.update(MockInterview)
              .set({ overallRating: averageRating })
              .where(eq(MockInterview.mockId, mockInterviewId));
          
          console.log(`Updated MockInterview ID ${mockInterviewId} with average rating ${averageRating}`);
          console.log("checking for badge")
          await checkAndAssignBadge(user.id, user.fullName, averageRating)
      } catch (error) {
          console.error('Error updating overall rating:', error);
          throw new Error('Failed to update overall rating');
      }
  }
// Custom debounce hook
const useDebounce = (callback, delay) => {
  const [isDebounced, setIsDebounced] = useState(false);

  useEffect(() => {
    if (!isDebounced) return;

    const handler = setTimeout(() => {
      callback();
      setIsDebounced(false);
    }, delay);

    return () => clearTimeout(handler);
  }, [isDebounced, callback, delay]);

  return () => setIsDebounced(true);
};

const handleEndInterviewDebounced = useDebounce(async () => {
  await updateOverallRating(params.interviewId);
  console.log("updated the overall data successfully");
  router.push(`/dashboard/interview/${params.interviewId}/feedback`);
}, 8000);



  const [interViewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  useEffect(() => {
    GetInterviewDetails();
  }, []);
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    console.log(
      "🚀 ~ file: page.jsx:18 ~ GetInterviewDetails ~ jsonMockResp:",
      jsonMockResp
    );
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions */}
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
        {/* video or audion recording */}
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interViewData}
        />
      </div>
      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
        {activeQuestionIndex!=mockInterviewQuestion?.length-1 && <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
        {activeQuestionIndex==mockInterviewQuestion?.length-1 &&
        // <Link href={'/dashboard/interview/'+interViewData?.mockId+'/feedback'}>
        <Button onClick={handleEndInterviewDebounced}>End Interview</Button>
         }
      </div>
    </div>
  );
};

export default StartInterview;
