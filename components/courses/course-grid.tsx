"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { StudentsService } from "@/services/studentsService";
import { AssignedCourse } from "@/services/studentsService";
import { CourseSkeleton } from "../ui/courseSkeleton";

interface CourseGridProps {
  searchQuery?: string;
}

export function CourseGrid({ searchQuery = "" }: CourseGridProps) {
  const [courses, setCourses] = useState<AssignedCourse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isActive = true;
    const run = async () => {
      setIsLoading(true);
      const data = await StudentsService.fetchAvailableCourses({
        search: searchQuery,
      });
      if (isActive) {
        setCourses(data);
        setIsLoading(false);
      }
    };

    run();

    return () => {
      isActive = false;
    };
  }, [searchQuery]);

  if (isLoading) {
    return <CourseSkeleton />;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.length === 0 ? (
        <div className="col-span-full text-center py-8 text-muted-foreground">
          {searchQuery.trim()
            ? `No courses found matching "${searchQuery}"`
            : "No courses available"}
        </div>
      ) : (
        courses.map((c, index) => (
          <Card key={index} className="overflow-hidden border-foreground/50">
            <CardHeader>
              <CardTitle className="line-clamp-2 text-balance">
                <div className="flex justify-between items-start gap-2">
                  {c.course.name}
                  <span className="text-sm font-medium text-main-bg">
                    Remaining Tokens : {c.remainingToken}
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
