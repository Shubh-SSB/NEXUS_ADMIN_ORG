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
  const [pagination, setPagination] = useState<PaginationParams>(
    initialParams || { page: 0, limit: 10 },
  );

  const fetchStudents = async (params?: PaginationParams) => {
    try {
      setIsLoading(true);
      setError(null);

      const currentParams = params || pagination;
      const data = await StudentsService.fetchStudentsWithMeta(currentParams);
      setPaginatedData(data);
      setPagination(currentParams);
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
  };

  const goToPage = (page: number) => {
    if (page >= 0 && page <= paginatedData.totalPages - 1) {
      fetchStudents({ ...pagination, page });
    }
  };

  const changeLimit = (limit: number) => {
    fetchStudents({ page: 0, limit });
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
    fetchStudents(pagination);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

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
