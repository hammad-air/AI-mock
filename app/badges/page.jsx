"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import BadgeItemCard from "@/app/badges/_components/BadgeItemCard";
import Link from "next/link";
import { getUserBadges } from "@/app/badges/actions/actions";
import useSWR from "swr";

// Fetcher function for SWR
const fetchBadges = async (userEmail) => {
  if (!userEmail) return [];
  return await getUserBadges(userEmail);
};

// Skeleton loader
const SkeletonBadge = () => (
  <div className="p-6 w-full max-w-xs bg-gray-200 rounded-lg shadow-xl animate-pulse">
    <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
    <div className="w-3/4 h-4 bg-gray-300 mx-auto mb-3"></div>
    <div className="w-2/3 h-4 bg-gray-300 mx-auto"></div>
  </div>
);

const BadgeList = () => {
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  // Use SWR for caching & faster loads
  const { data: badgeList, error, isLoading } = useSWR(userEmail, fetchBadges);

  if (isLoading) {
    return (
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Hello, {user?.firstName || "User"}!</h2>
        <p className="text-lg text-gray-600 mb-6">Loading your badges...</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(4)
            .fill(0)
            .map((_, index) => <SkeletonBadge key={index} />)}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-3xl font-semibold text-red-600 mb-4">Oops! Something went wrong.</h2>
        <p className="text-lg text-gray-700">We couldn't load your badges. Try again later.</p>
      </div>
    );
  }

  if (!badgeList || badgeList.length === 0) {
    return (
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Interview Badges for {user?.firstName || "User"}</h2>
        <p className="text-lg text-gray-600 mb-6">No badges earned yet. Complete mock interviews to earn one!</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Interview Badges for {user?.firstName || "User"}</h2>
      <p className="text-md text-gray-600 mb-4">Review your earned badges from completed mock interviews.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {badgeList.map((badge, index) => (
          <div key={index} className="w-full max-w-xs py-6 px-8 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-col items-center text-center">
            <BadgeItemCard badge={badge} />
            <p className="mt-2 text-lg font-medium text-gray-700">{badge.badgeName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgeList;
