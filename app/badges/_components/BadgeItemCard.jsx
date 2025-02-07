import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";

import badgeDictionary from "@/lib/badgeDictionary"

// const badgeDictionary = {
  
//   "Silver Badge": {
//     icon: "/silverbadge.png",
//     description: "Awarded for a rating > 4, this badge highlights your strong coding skills, solid problem-solving abilities, and clear understanding of core concepts. Keep up the great work—you’re on the path to excellence!"
//   },
//   "Golden Badge": {
//     icon: "/Goldenbadge.png",
//     description: "Awarded for a rating > 7, this badge recognizes your outstanding problem-solving skills, clean code, and deep understanding of algorithms. You’ve proven yourself as a top-tier coder—wear it with pride!"
//   }
// };

// Skeleton loader for badge item
const SkeletonBadgeItemCard = () => (
  <div className="p-4 w-full max-w-xs bg-gray-200 rounded-lg shadow animate-pulse flex flex-col items-center">
    <div className="w-20 h-20 bg-gray-300 rounded-full mb-4"></div>
    <div className="w-3/4 h-4 bg-gray-300 mb-2"></div>
    <div className="w-2/3 h-4 bg-gray-300"></div>
  </div>
);

export default function BadgeItemCard({ badge }) {
  const [isOpen, setIsOpen] = useState(false);
  const badged = badge ? badgeDictionary[badge.badgeName] : null;

  if (!badge) {
    return <SkeletonBadgeItemCard />;
  }

  return (
    <div className="flex justify-center items-center w-fit mx-auto">
      <div
        className="p-2 bg-gray-100 rounded-lg shadow-lg flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out w-20"
        onClick={() => setIsOpen(true)}
      >
        <Image src={badged.icon} alt={badge.badgeName} width={40} height={40} className="mb-1" />
        <p className="font-semibold text-xs text-center">{badge.badgeName}</p>
      </div>

      {/* Badge Details Dialog */}
      {isOpen && (
        <Dialog open={true} onOpenChange={() => setIsOpen(false)}>
          <DialogContent className="p-4 max-w-xs text-center rounded-xl shadow-2xl bg-white">
            <DialogTitle className="text-lg font-bold mb-2 text-gray-800">{badge.badgeName}</DialogTitle>
            <Image src={badged.icon} alt={badge.badgeName} width={70} height={70} className="mx-auto mb-3" />
            <p className="text-sm text-gray-600 leading-relaxed">{badged.description}</p>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
