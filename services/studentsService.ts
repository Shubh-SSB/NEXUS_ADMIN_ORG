import { $crud } from "@/factory/crudFactory";

export interface AssignedCourse {
  id: number;
  remainingToken: number;
  course: {
    id: number;
    name: string;
    description: string;
  };
}

export interface FiltersProps {
  onSearchChange: (query: string) => void;
}

export interface StudentData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  dob?: string;
  courses?: number;
}

export interface CreateStudentData {
  name: string;
  email: string;
  phone: string;
  dob: string;
  enrollCourses: number[];
  password: string;
}

export interface UpdateStudentData {
  name: string;
  email: string;
  phone?: string;
  dob?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedStudentsResponse {
  students: StudentData[];
  totalRecords: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedStudentsResponse {
  students: StudentData[];
  totalRecords: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export class StudentsService {
  // Transform raw API student data to our StudentData interface
  private static transformStudent(student: any): StudentData {
    return {
      id: student.id?.toString() || Math.random().toString(),
      name: student.name || "—",
      email: student.email || "—",
      phone: student.phone || "—",
      dob: student.dob ? new Date(student.dob).toLocaleDateString() : "—",
      courses: student.enrolledCourses || student.courses || 0,
    };
  }

  static async fetchStudents(
    params?: PaginationParams,
  ): Promise<StudentData[]> {
    try {
      let url = "retrieve/organization/students";
      if (params) {
        url += `?page=${params.page}&limit=${params.limit}`;
      }

      const response = await $crud.get(url);

      // Handle the actual API response structure: response.data.rows
      //   @ts-ignore
      if (response.data?.rows && Array.isArray(response.data.rows)) {
        // @ts-ignore
        return response.data.rows.map(this.transformStudent);
      } else {
        console.warn("Unexpected API response format:", response);
        return [];
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      throw error;
    }
  }

  static async fetchStudentsWithMeta(
    params?: PaginationParams,
  ): Promise<PaginatedStudentsResponse> {
    try {
      let url = "retrieve/organization/students";
      if (params) {
        url += `?page=${params.page}&limit=${params.limit}`;
      }

      const response = await $crud.get(url);
      // @ts-ignore
      if (response.data?.rows && Array.isArray(response.data.rows)) {
        // @ts-ignore
        const students = response.data.rows.map(this.transformStudent);
        //   @ts-ignore
        const totalRecords = response.data.totalRecords || students.length;
        const currentPage = params?.page ?? 0;
        const limit = params?.limit || totalRecords;
        const totalPages = Math.ceil(totalRecords / limit);

        return {
          students,
          totalRecords,
          currentPage,
          totalPages,
          hasNextPage: currentPage < totalPages - 1,
          hasPrevPage: currentPage > 0,
        };
      } else {
        console.warn("Unexpected API response format:", response);
        return {
          students: [],
          totalRecords: 0,
          currentPage: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPrevPage: false,
        };
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      throw error;
    }
  }

  static async createStudent(
    studentData: CreateStudentData,
  ): Promise<StudentData> {
    try {
      const response = await $crud.post(
        "create/organization/student",
        studentData,
      );

      if (response.data) {
        return this.transformStudent(response.data);
      }
      throw new Error("Failed to create student");
    } catch (error) {
      console.error("Error creating student:", error);
      throw error;
    }
  }

  static async updateStudent(
    id: string,
    studentData: UpdateStudentData,
  ): Promise<StudentData> {
    try {
      const response = await $crud.update(
        `update/organization/student/${id}`,
        studentData,
      );

      if (response.data) {
        return this.transformStudent(response.data);
      }
      throw new Error("Failed to update student");
    } catch (error) {
      console.error("Error updating student:", error);
      throw error;
    }
  }

  static async getStudent(id: string): Promise<StudentData | null> {
    try {
      const response = await $crud.get(`retrieve/organization/students/${id}`);

      if (response.data) {
        return this.transformStudent(response.data);
      }
      return null;
    } catch (error) {
      console.error("Error fetching student:", error);
      throw error;
    }
  }

  static async bulkCreateStudents(csvFile: File): Promise<StudentData[]> {
    try {
      const formData = new FormData();
      formData.append("csv", csvFile);

      const response = await $crud.uploadFile(
        "create/organization/students/bulk",
        formData,
      );

      if (response.data && Array.isArray(response.data)) {
        return response.data.map(this.transformStudent);
      }
      return [];
    } catch (error) {
      console.error("Error bulk creating students:", error);
      throw error;
    }
  }

  static async fetchAvailableCourses(): Promise<AssignedCourse[]> {
    try {
      const response = await $crud.get(
        "retrieve/organization/assigned/courses",
      );
      // @ts-ignore
      return response.data?.assignedCourses || [];
    } catch (error) {
      console.error("Error fetching courses:", error);
      return [];
    }
  }
}
