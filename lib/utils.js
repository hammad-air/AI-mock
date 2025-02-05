// import { clerkClient } from "@clerk/nextjs/server";

import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}




export async function getUserDetails(userId) {
  try {
    const user = await clerkClient.users.getUser(userId);
    return user; // Returns user details
  } catch (error) {
    console.error("Error fetching user:", error);
    return null; // Handle errors (e.g., user not found)
  }
}


