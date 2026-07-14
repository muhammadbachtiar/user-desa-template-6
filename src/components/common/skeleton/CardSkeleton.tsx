import React from "react";

export const CardSkeleton = () => {
  return (
    <div className="animate-pulse rounded-lg bg-white shadow-sm p-4 space-y-4">
      <div className="h-48 bg-gray-200 rounded-md" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
    </div>
  );
};
