// components/common/skeletons/TourPageSkeleton.tsx

import React from "react";
import { CardSkeleton } from "./CardSkeleton";
export default function TourPageSkeleton() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="px-6 lg:px-10 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 2xl:px-0 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, idx) => (
            <CardSkeleton key={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
