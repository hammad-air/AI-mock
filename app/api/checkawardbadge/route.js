import { db } from "@/utils/db";
import { BadgesData } from "@/utils/schema";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { userEmail, badgeName } = await req.json();

        if (!userEmail || !badgeName) {
            return NextResponse.json({ message: "Missing userEmail or badgeName" }, { status: 400 });
        }

        await db.insert(BadgesData).values({
            userEmail,
            badgeName,
            awardedAt: new Date(),
        });
        console.log("Adedd BageDAta Succesfull  -- api/checkawardbadge   lin:13")

        return NextResponse.json({ message: "Badge awarded successfully!" }, { status: 201 });
    } catch (error) {
        console.error("Error awarding badge:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
