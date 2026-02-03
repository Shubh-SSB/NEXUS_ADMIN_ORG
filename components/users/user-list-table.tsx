"use client";

import { forwardRef, useImperativeHandle, useState, useMemo } from "react";
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
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Eye,
  Edit,
  RefreshCw,
  FileWarningIcon,
} from "lucide-react";
import { useStudents } from "@/hooks/useStudents";
import { UserTableSkeleton } from "@/components/ui/user-table-skeleton";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { UpdateStudentModal } from "@/components/modals/update-student-modal";
import { StudentData } from "@/services/studentsService";

export interface UserListTableRef {
  refetch: () => void;
}

interface UserListTableProps {
  searchQuery?: string;
}

export const UserListTable = forwardRef<UserListTableRef, UserListTableProps>(
  ({ searchQuery = "" }, ref) => {
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(
      null,
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
    } = useStudents({ page: 0, limit: 10, search: searchQuery });

    // Expose refetch method through ref
    useImperativeHandle(
      ref,
      () => ({
        refetch,
      }),
      [refetch],
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

    const filteredStudents = useMemo(() => {
      if (!searchQuery.trim()) return students;

      const query = searchQuery.toLowerCase();
      return students.filter(
        (student) =>
          student.name.toLowerCase().includes(query) ||
          student.email.toLowerCase().includes(query),
      );
    }, [students, searchQuery]);

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
            <h3 className="text-lg font-semibold">
              Students (
              {searchQuery
                ? `${students.length} of ${totalRecords}`
                : totalRecords}
              )
            </h3>
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
            <TableHeader className="py-2">
              <TableRow className="text-lg font-bold">
                <TableHead className="w-[5%]">#</TableHead>
                {/* <TableHead className="w-[10%]">Avatar</TableHead> */}
                <TableHead className="w-[35%]">Student's Details</TableHead>
                <TableHead className="w-[20%] pl-5">Phone</TableHead>
                <TableHead className="w-[16%] pl-3">D.O.B</TableHead>
                <TableHead className="w-[15%] pl-10">Actions</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
          <div className="max-h-[calc(100vh-420px)] overflow-auto">
            <Table>
              <TableBody>
                {students.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <FileWarningIcon />
                      <div className="text-muted-foreground">
                        {searchQuery
                          ? `No students found matching "${searchQuery}"`
                          : "No students found"}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  students.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="w-[5%]">{user.id || "—"}</TableCell>
                      {/* <TableCell>
                        <Avatar>
                          <AvatarFallback>
                            {user.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </TableCell> */}

                      <TableCell className="w-[35%]">
                        <div className="flex items-start justify-start w-fit gap-3">
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="w-[20%]">
                        {user.phone || "—"}
                      </TableCell>
                      <TableCell className="w-[20%]">
                        {user.dob || "—"}
                      </TableCell>
                      <TableCell className="w-[10%]">
                        <Button
                          variant="ghost"
                          className="flex flex-row items-center cursor-pointer"
                          size="icon-sm"
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit className="h-4 w-4" />
                          Edit Student
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

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
  },
);

UserListTable.displayName = "UserListTable";
