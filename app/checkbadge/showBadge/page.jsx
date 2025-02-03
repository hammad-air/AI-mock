"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/utils/db";
import { BadgesData } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import BadgeItemCard from "@/app/checkbadge/_components/BadgeItemCard";

const BadgeList = () => {
  const { user } = useUser();
  const [badgeList, setBadgeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchBadgeList();
    }
  }, [user]);

  const fetchBadgeList = async () => {
    try {
      // Fetch badges where the user's email matches
      const result = await db
        .select()
        .from(BadgesData)
        .where(eq(BadgesData.userEmail, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(BadgesData.awardedAt)); // Order by awardedAt descending
        console.log(`badges for ${user.fullName}`)
      console.log("Fetched badges:", result);
      setBadgeList(result);
    } catch (err) {
      console.error("Error fetching badge list:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading badges...</p>;
  }

  if (error) {
    return <p>Error loading badges: {error.message}</p>;
  }

  return (
    <div>
      <h2 className="font-medium text-xl">Your Badges</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {badgeList.map((badge, index) => (
          <BadgeItemCard key={index} badge={badge} />
        ))}
      </div>
    </div>
  );
};

export default BadgeList;
