"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import BadgeItemCard from "@/app/badges/_components/BadgeItemCard";
import Link from "next/link";
import { getUserBadges } from "@/app/badges/actions/actions";
import useSWR from "swr";
import { HomeIcon } from "lucide-react";

import ShareButton from "@/app/badges/_components/ShareButton";

// Fetcher function for SWR (handles fetching user badges)
const fetchBadges = async (userid) => {
  if (!userid) return [];
  return await getUserBadges(userid);
};

// Skeleton loader for better user experience
const SkeletonBadge = () => (
  <div className="p-6 w-full max-w-xs bg-gray-200 rounded-lg shadow-xl animate-pulse">
    <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
    <div className="w-3/4 h-4 bg-gray-300 mx-auto mb-3"></div>
    <div className="w-2/3 h-4 bg-gray-300 mx-auto"></div>
  </div>
);

const BadgeList = ({ params }) => {
  // const { user } = useUser();
  
  // Use SWR for caching & faster loads
  const { data: badgeList, error, isLoading } = useSWR(params.userid, fetchBadges);

  return (
    
    <div className="p-6 w-full">
      {/* Breadcrumbs for navigation */}
      <div className="flex justify-between w-full items-center">
      <nav className="mb-4 text-gray-600 text-sm flex items-center space-x-2 w-2xl">
        <Link href="/" className="flex items-center hover:text-blue-500">
          <HomeIcon size={16} className="mr-1" /> Home
        </Link>
        <span>/</span>
        <span className="text-gray-800 font-semibold">Badges</span>
        {badgeList?.length > 0 && <>
          <span>/</span>
          <span className="text-gray-800 font-semibold">{badgeList[0].userName}</span>
        </>}

        
      </nav>
      <div className="flex justify-start mb-6">
  <ShareButton text={window.location.href} />
</div>
     
      </div>

     



      <h2 className="text-3xl font-bold text-gray-800 mb-4">Interview Badges </h2>
      <p className="text-lg text-gray-600 mb-6">Review your earned badges from completed mock interviews.</p>
      
      {/* Loading state */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, index) => <SkeletonBadge key={index} />)}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-center text-red-600 font-semibold text-lg">
          Oops! Something went wrong. Please try again later.
        </div>
      )}

      {/* No badges state */}
      {!isLoading && !error && (!badgeList || badgeList.length === 0) && (
        <p className="text-lg text-gray-600">No badges earned yet. Complete mock interviews to earn one!</p>
      )}

      {/* Display badges */}
      {!isLoading && !error && badgeList?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {badgeList.map((badge, index) => (
            <div key={index} className="w-full max-w-xs py-6 px-8 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-col items-center text-center">
              <BadgeItemCard badge={badge} />
              <p className="mt-2 text-lg font-medium text-gray-700">{badge.badgeName}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BadgeList;
