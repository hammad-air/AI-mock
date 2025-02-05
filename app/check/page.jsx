"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const UpdateJobPosition = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [mockId, setMockId] = useState(""); // Mock ID input
  const [newJobPosition, setNewJobPosition] = useState(""); // New job position
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await db
        .update(MockInterview)
        .set({ jobPosition: newJobPosition })
        .where(eq(MockInterview.mockId, mockId))
        .returning({ mockId: MockInterview.mockId, jobPosition: MockInterview.jobPosition });

      console.log("Updated Record:", res);
      
      if (res.length > 0) {
        alert("Job Position updated successfully!");
        setOpenDialog(false);
        router.refresh(); // Refresh page to reflect changes
      } else {
        alert("No record found with the given Mock ID.");
      }
    } catch (error) {
      console.error("Error updating job position:", error);
      alert("Failed to update job position.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={() => setOpenDialog(true)}>Update Job Position</Button>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Job Position</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Mock ID</label>
                <Input
                  placeholder="Enter Mock ID"
                  required
                  value={mockId}
                  onChange={(e) => setMockId(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">New Job Position</label>
                <Input
                  placeholder="Enter New Job Position"
                  required
                  value={newJobPosition}
                  onChange={(e) => setNewJobPosition(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Updating..." : "Update"}
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateJobPosition;
