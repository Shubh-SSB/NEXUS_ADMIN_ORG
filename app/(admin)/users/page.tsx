"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { UserListTable } from "@/components/users/user-list-table";
import { UserFilters } from "@/components/users/user-filters";
import { Button } from "@/components/ui/button";
import { UserPlus, Upload } from "lucide-react";
import { CreateStudentModal } from "@/components/modals/create-student-modal";
import { BulkUploadModal } from "@/components/modals/bulk-upload-modal";

export default function UsersPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isBulkUploadModalOpen, setIsBulkUploadModalOpen] = useState(false);
  const tableRef = useRef<{ refetch: () => void }>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleStudentCreated = useCallback(() => {
    // Use ref to avoid re-rendering the entire table component
    tableRef.current?.refetch();
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsCreateModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsCreateModalOpen(false);
  }, []);

  const handleOpenBulkUpload = useCallback(() => {
    setIsBulkUploadModalOpen(true);
  }, []);

  const handleCloseBulkUpload = useCallback(() => {
    setIsBulkUploadModalOpen(false);
  }, []);

  const handleBulkUploadComplete = useCallback(() => {
    tableRef.current?.refetch();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Students Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Create and manage learners
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="cursor-pointer hover:bg-foreground/90"
            onClick={handleOpenBulkUpload}
          >
            <Upload className="h-4 w-4" />
            Bulk Upload
          </Button>
          <Button
            className="bg-main-bg hover:bg-main-bg/90 cursor-pointer"
            onClick={handleOpenModal}
          >
            <UserPlus className="h-4 w-4" />
            Create User
          </Button>
        </div>
      </div>

      <UserFilters onSearchChange={setSearchQuery} />
      <UserListTable ref={tableRef} searchQuery={searchQuery} />

      {/* Create Student Modal */}
      <CreateStudentModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseModal}
        onStudentCreated={handleStudentCreated}
      />

      {/* Bulk Upload Modal */}
      <BulkUploadModal
        isOpen={isBulkUploadModalOpen}
        onClose={handleCloseBulkUpload}
        onBulkUploadComplete={handleBulkUploadComplete}
      />
    </div>
  );
}
