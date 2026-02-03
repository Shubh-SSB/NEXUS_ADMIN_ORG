import { useState, useEffect, useCallback, useRef } from "react";
import {
  StudentsService,
  StudentData,
  PaginationParams,
  PaginatedStudentsResponse,
} from "@/services/studentsService";

export const useStudents = (initialParams?: PaginationParams) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paginatedData, setPaginatedData] = useState<PaginatedStudentsResponse>(
    {
      students: [],
      totalRecords: 0,
      currentPage: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false,
    },
  );
  const [pagination, setPagination] = useState<PaginationParams>({
    page: initialParams?.page ?? 0,
    limit: initialParams?.limit ?? 10,
  });
  const [search, setSearch] = useState(initialParams?.search ?? "");

  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(async () => {
      try {
        const data = await StudentsService.fetchStudentsWithMeta({
          ...pagination,
          search,
        });
        setPaginatedData(data);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching students:", err);
        setError(err.message || "Failed to fetch students data");
        setPaginatedData({
          students: [],
          totalRecords: 0,
          currentPage: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPrevPage: false,
        });
      } finally {
        setIsLoading(false);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [pagination, search]);

  useEffect(() => {
    if (initialParams?.search !== undefined) {
      setSearch(initialParams.search);
      setPaginatedData((prev) => ({ ...prev, page: 0 }));
    }
  }, [initialParams?.search]);

  const goToPage = (page: number) => {
    if (page >= 0 && page <= paginatedData.totalPages - 1) {
      setPagination({ ...pagination, page });
    }
  };

  const changeLimit = (limit: number) => {
    setPagination({ page: 0, limit });
  };

  const nextPage = () => {
    if (paginatedData.hasNextPage) {
      goToPage(paginatedData.currentPage + 1);
    }
  };

  const prevPage = () => {
    if (paginatedData.hasPrevPage) {
      goToPage(paginatedData.currentPage - 1);
    }
  };

  const refetch = () => {
    setPagination({ ...pagination });
    StudentsService.fetchStudentsWithMeta({
      ...pagination,
      search,
    })
      .then((data) => setPaginatedData(data))
      .catch((err) => setError(err.message || "Failed to fetch students data"))
      .finally(() => setIsLoading(false));
  };

  return {
    // Data
    students: paginatedData.students,
    totalRecords: paginatedData.totalRecords,
    currentPage: paginatedData.currentPage,
    totalPages: paginatedData.totalPages,
    hasNextPage: paginatedData.hasNextPage,
    hasPrevPage: paginatedData.hasPrevPage,

    // State
    isLoading,
    error,
    pagination,

    // Actions
    refetch,
    goToPage,
    changeLimit,
    nextPage,
    prevPage,
  };
};
