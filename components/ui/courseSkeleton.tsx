import { Card, CardDescription, CardHeader, CardTitle } from "./card";
import { Skeleton } from "./skeleton";

export function CourseSkeleton({ rows = 10 }: { rows?: number }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: rows }).map((_, index) => (
        <Card key={index} className="overflow-hidden border-foreground/50">
          <CardHeader>
            <div className="flex justify-between items-start gap-2 mb-2">
              {/* Avatar skeleton */}
              <Skeleton className="h-10 w-10 rounded-full" />
              {/* Token badge skeleton */}
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            <CardTitle className="line-clamp-2 text-balance">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardTitle>
            <CardDescription className="line-clamp-2 text-balance mt-2">
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-5/6" />
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
