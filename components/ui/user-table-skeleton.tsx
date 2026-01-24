import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RefreshCw } from "lucide-react";
import { Button } from "./button";

export function UserTableSkeleton({ rows = 10 }: { rows?: number }) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex justify-between items-center p-4 border-b">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-8 w-fit">
            <div className="flex items-center h-fit w-fit p-1.5 has-[>svg]:px-2.5 rounded-md gap-3.5 justify-center">
              <RefreshCw className={`h-4 w-4 animate-spin`} />
              <span className="text-sm font-medium">Refresh</span>
            </div>
          </Skeleton>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="text-lg font-bold my-2">
              <TableHead className="pl-4 w-[35%]">User</TableHead>
              <TableHead className="w-[15%]">ID</TableHead>
              <TableHead className="w-[20%]">Phone</TableHead>
              <TableHead className="w-[20%]">D.O.B</TableHead>
              <TableHead className="w-[10%]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-start justify-start w-fit gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-8" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-8" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Skeleton */}
        <div className="flex items-center justify-between p-4 border-t">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex items-center space-x-1">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
