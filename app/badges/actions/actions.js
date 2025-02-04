import { db } from "@/utils/db";
import { BadgesData } from "@/utils/schema";
import { eq, desc } from "drizzle-orm";

export async function getUserBadges(userEmail) {
  if (!userEmail) return [];
  return await db
    .select()
    .from(BadgesData)
    .where(eq(BadgesData.userEmail, userEmail))
    .orderBy(desc(BadgesData.awardedAt));
}
