import { useState, useEffect } from "react";
import { $crud } from "@/factory/crudFactory";

const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [students, setStudents] = useState<StudentData[]>([]);

const fetchStudents = async () => {
  try {
    setIsLoading(true);
    setError(null);

    const response = await $crud.get("retrieve/organization/students");

    if (response.data && Array.isArray(response.data)) {
      // Transform the API response to match our expected format
      const transformedStudents = response.data.map((student: any) => ({
        id: student.id?.toString() || Math.random().toString(),
        name:
          student.name ||
          `${student.firstName || ""} ${student.lastName || ""}`.trim(),
        email: student.email || "—",
        phone: student.phone || student.phoneNumber || "--",
        dob: student.dob || student.dateOfBirth || "--",
        courses: student.enrolledCourses || student.courses || 0,
      }));

      setStudents(transformedStudents);
    } else {
      console.warn("Unexpected API response format:", response);
      setStudents([]);
    }
  } catch (err: any) {
    console.error("Error fetching students:", err);
    setError(err.message || "Failed to fetch students data");
    setStudents([]);
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
  fetchStudents();
}, []);

export { isLoading, fetchStudents, error, students };
