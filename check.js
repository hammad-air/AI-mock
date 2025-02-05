import { eq } from "drizzle-orm";

import { db } from "@/utils/db";

const updatedMockId = "a5666557-c55b-4c93-8ed2-78f6b44becf1"; // Replace with actual mockId
const newJobPosition = "Senior Developer"; // New job position

const res = await db
  .update(MockInterview)
  .set({ jobPosition: newJobPosition })
  .where(eq(MockInterview.mockId, updatedMockId))
  .returning({ mockId: MockInterview.mockId, jobPosition: MockInterview.jobPosition });

console.log("Updated Record:", res);
