"use server"

import { db } from "@/utils/db";
import { BadgesData } from "@/utils/schema";
import { eq, desc } from "drizzle-orm";

import { clerkClient } from "@clerk/nextjs/server";

export async function getUserBadges(userEmail) {
  if (!userEmail) return [];
  return await db
    .select()
    .from(BadgesData)
    .where(eq(BadgesData.userEmail, userEmail))
    .orderBy(desc(BadgesData.awardedAt));
}




export async function getUserDetails(userId) {
  try {
    const user = await clerkClient.users.getUser(userId);
    const userdata=JSON.parse(JSON.stringify(user));

    console.log("userdata:",userdata)
    return userdata; // Convert to plain object
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}



