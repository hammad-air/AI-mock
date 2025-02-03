// components/BadgeItemCard.jsx

import React from "react";

const BadgeItemCard = ({ badge }) => {
  const awardedAtDate = new Date(badge.awardedAt); // Convert the string to a Date object
  const formattedDate = awardedAtDate.toLocaleDateString(); // Format it to a readable string

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <h3 className="font-semibold text-lg text-center">{badge.badgeName}</h3>
      <p className="text-sm text-gray-500 text-center">{formattedDate}</p> {/* Render formatted date */}
      <div className="flex justify-center mt-3">
        <span className="text-sm text-gray-600">Awarded on {formattedDate}</span>
      </div>
    </div>
  );
};

export default BadgeItemCard;
