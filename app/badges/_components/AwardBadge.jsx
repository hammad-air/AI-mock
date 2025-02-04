"use client"; // Client Component

import { useState } from "react";

export default function AwardBadge() {
    const [userEmail, setUserEmail] = useState("");
    const [badgeName, setBadgeName] = useState("");
    const [message, setMessage] = useState("");

    const handleAwardBadge = async () => {
        if (!userEmail || !badgeName) {
            setMessage("Please enter both email and badge name.");
            return;
        }

        try {
            const response = await fetch("/api/checkawardbadge", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userEmail, badgeName }),
            });

            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            console.error("Error:", error);
            setMessage("Failed to award badge.");
        }
    };

    return (
        <div className="p-4 bg-gray-100 rounded-lg max-w-sm mx-auto">
            <h2 className="text-xl font-bold mb-2">Award a Badge</h2>
            <input
                type="email"
                placeholder="User Email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="border p-2 rounded mb-2 w-full"
            />
            <input
                type="text"
                placeholder="Badge Name"
                value={badgeName}
                onChange={(e) => setBadgeName(e.target.value)}
                className="border p-2 rounded mb-2 w-full"
            />
            <button
                onClick={handleAwardBadge}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
            >
                Award Badge
            </button>
            {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
        </div>
    );
}
