"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit, RefreshCw } from "lucide-react";
import { useStudents } from "@/hooks/useStudents";
import { UserTableSkeleton } from "@/components/ui/user-table-skeleton";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { UpdateStudentModal } from "@/components/modals/update-student-modal";
import { StudentData } from "@/services/studentsService";

export interface UserListTableRef {
  refetch: () => void;
}

export const UserListTable = forwardRef<UserListTableRef>((props, ref) => {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(
    null
  );

  const {
    students,
    isLoading,
    error,
    refetch,
    currentPage,
    totalPages,
    totalRecords,
    hasNextPage,
    hasPrevPage,
    pagination,
    goToPage,
    changeLimit,
  } = useStudents({ page: 1, limit: 10 });

  // Expose refetch method through ref
  useImperativeHandle(
    ref,
    () => ({
      refetch,
    }),
    [refetch]
  );

  const handleEditUser = (student: StudentData) => {
    setSelectedStudent(student);
    setUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedStudent(null);
  };

  const handleStudentUpdated = () => {
    refetch();
  };
  if (isLoading) {
    return <UserTableSkeleton />;
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="text-center">
            <div className="text-red-500 font-medium mb-2">
              Error loading students
            </div>
            <p className="text-sm text-muted-foreground mb-4">{error}</p>
            <Button onClick={refetch} variant="outline">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Students ({totalRecords})</h3>
          <Button
            onClick={refetch}
            variant="outline"
            size="sm"
            disabled={isLoading}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>D.O.B</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead className="w-2.5"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <div className="text-muted-foreground">No students found</div>
                </TableCell>
              </TableRow>
            ) : (
              students.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-start justify-start w-fit gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>
                          {user.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.phone || "—"}</TableCell>
                  <TableCell>{user.dob || "—"}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{user.courses || 0}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditUser(user)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        {totalRecords > 0 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            totalRecords={totalRecords}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            limit={pagination.limit}
            onPageChange={goToPage}
            onLimitChange={changeLimit}
          />
        )}
      </CardContent>

      {/* Update Student Modal */}
      <UpdateStudentModal
        isOpen={updateModalOpen}
        onClose={handleCloseUpdateModal}
        onStudentUpdated={handleStudentUpdated}
        student={selectedStudent}
      />
    </Card>
  );
});

UserListTable.displayName = "UserListTable";
