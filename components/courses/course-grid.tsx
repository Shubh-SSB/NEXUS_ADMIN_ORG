"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { StudentsService } from "@/services/studentsService";
import { AssignedCourse } from "@/services/studentsService";

interface CourseGridProps {
  searchQuery: string;
}

export function CourseGrid({ searchQuery }: CourseGridProps) {
  const [courses, setCourses] = useState<AssignedCourse[]>([]);

  useEffect(() => {
    StudentsService.fetchAvailableCourses().then((data) => setCourses(data));
  }, []);

  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return courses;

    const query = searchQuery.toLowerCase();
    return courses.filter((c) => c.course.name.toLowerCase().includes(query));
  }, [courses, searchQuery]);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredCourses.length === 0 && courses.length > 0 ? (
        <div className="col-span-full text-center py-8 text-muted-foreground">
          No courses found matching "{searchQuery}"
        </div>
      ) : (
        filteredCourses.map((c) => (
          <Card key={c.id} className="overflow-hidden border-foreground/50">
            <CardHeader>
              <CardTitle className="line-clamp-2 text-balance">
                <div className="flex justify-between items-start gap-2">
                  {c.course.name}
                  <span className="text-sm font-medium text-main-bg">
                    Remaining Tokens :{" "}
                    <span className="text-white">{c.remainingToken}</span>
                  </span>
                </div>
              </CardTitle>
              <CardDescription className="line-clamp-2 text-balance">
                {c.course.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))
      )}
    </div>
  );
}
