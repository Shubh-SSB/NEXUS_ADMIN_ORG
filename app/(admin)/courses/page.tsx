"use client";

import { useState } from "react";
import { CourseGrid } from "@/components/courses/course-grid";
import { CourseFilters } from "@/components/courses/course-filters";

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Courses</h1>
          <p className="text-muted-foreground mt-1">View learning content</p>
        </div>
      </div>

      <CourseFilters onSearchChange={setSearchQuery} />
      <CourseGrid searchQuery={searchQuery} />
    </div>
  );
}
