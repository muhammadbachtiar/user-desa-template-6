"use client";

import RichTextContent from "@/components/common/RichTextContent";
import { DynamicSectionData } from "@/types/DynamicSection";
import { useState, useEffect } from "react";

interface SambutanSectionProps {
  sections: DynamicSectionData[];
  isLoading?: boolean;
}

export function SambutanSection({ sections, isLoading }: SambutanSectionProps) {
  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    if (sections.length > 0 && !activeTab) {
      setActiveTab(sections[0].config.id);
    }
  }, [sections, activeTab]);

  if (isLoading) {
    return (
      <section className="py-16 flex justify-center">
        <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
          <div className="animate-pulse">
            <div className="flex space-x-4 border-b mb-4">
              <div className="h-8 w-32 bg-gray-200 rounded" />
              <div className="h-8 w-24 bg-gray-200 rounded" />
            </div>
            <div className="min-h-52 bg-gray-100 rounded" />
          </div>
        </div>
      </section>
    );
  }

  if (sections.length === 0) {
    return null;
  }

  const activeSection = sections.find((s) => s.config.id === activeTab) || sections[0];

  return (
    <section className="py-16 flex justify-center">
      <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
        <div className="items-center">
          <div>
            <div className="flex flex-nowrap overflow-x-auto md:flex-wrap gap-2 border-b pb-2 scrollbar-hide">
              {sections.map((section) => (
                <button
                  key={section.config.id}
                  onClick={() => setActiveTab(section.config.id)}
                  className={`py-2 px-4 text-sm font-medium whitespace-nowrap rounded-t-lg transition-colors flex-shrink-0 ${
                    activeTab === section.config.id
                      ? "text-green-600 bg-green-50 border-b-2 border-green-600"
                      : "text-gray-600 hover:text-green-600 hover:bg-gray-50"
                  }`}
                >
                  {section.config.title}
                </button>
              ))}
            </div>
            <div className="mt-4">
              <div className="mt-4 min-h-52">
                <RichTextContent content={activeSection?.content || ""} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
