// import { clerkClient } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { BadgesData } from "@/utils/schema";

import { eq } from 'drizzle-orm';

import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}



// it will be call by   "app\dashboard\interview\[interviewId]\start\page.jsx"  on line  no 51  in  "updateOverallRating"
export async function checkAndAssignBadge(userEmail, userName, rating) {
  try {
      let badgeName = null;

      if (rating > 0) {
          badgeName = 'Golden Badge';
      } else if (rating > 4) {
          badgeName = 'Silver Badge';
      }

      // if (badgeName) {
      //     // Check if the user already has this badge
      //     const existingBadge = await db.select()
      //         .from(BadgesData)
      //         .where(eq(BadgesData.userEmail, userEmail))
      //         .where(eq(BadgesData.badgeName, badgeName));

      //     if (true) {
              // Assign the badge
              await db.insert(BadgesData).values({
                  userEmail,
                  userName,
                  badgeName,
                  awardedAt: new Date()
              });

          //     console.log(`Assigned ${badgeName} to ${userName} (${userEmail})`);
          // } else {
          //     console.log(`${userName} (${userEmail}) already has a ${badgeName}.`);
          // }
      
  } catch (error) {
      console.error('Error assigning badge:', error);
      throw new Error('Failed to assign badge');
  }
}



