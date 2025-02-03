import { db } from "@/utils/db"; // Adjust path according to your project structure
import { BadgesData } from "@/utils/schema"; // Adjust path based on your file structure




import { desc, eq } from "drizzle-orm" // Import eq for equality comparison

export default async function BadgeList({ userEmail }) {
    try {
        // Fetch badges based on userEmail
        const badges = await db
            .select()
            .from(BadgesData)
            .where(BadgesData.userEmail, userEmail)  // Correct filter without using eq
            .orderBy(BadgesData.id, "desc");  // Order by ID in descending order

        // Render badges data
        return (
            <div>
                <h2>Badges for {userEmail}</h2>
                <ul>
                    {badges.length > 0 ? (
                        badges.map((badge) => (
                            <li key={badge.id}>
                                <strong>{badge.badgeName}</strong> - Awarded on: {badge.awardedAt}
                            </li>
                        ))
                    ) : (
                        <p>No badges awarded yet.</p>
                    )}
                </ul>
            </div>
        );
    } catch (error) {
        console.error("Error fetching badges:", error);  // Log any error to the console
        return <p>Error fetching badges! {error.message}</p>;  // Display error message
    }
}