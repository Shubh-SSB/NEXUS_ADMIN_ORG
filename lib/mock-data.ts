// Mock data for demonstration purposes
export type UserRole = "admin" | "manager" | "trainer" | "learner";

export interface User {
  id: string;
  name: string;
  email: string;
  dob: string;
  courses: number;
  phone?: string;
  // role: UserRole;
  // status: "active" | "inactive"
  // department?: string
  // lastLogin?: string
  // enrolledCourses?: number
}

export interface Course {
  id: string;
  title: string;
  description: string;
  status: "draft" | "published";
  enrolledCount: number;
  completionRate: number;
  thumbnail?: string;
  createdAt: string;
}

export interface Trainer {
  id: string;
  name: string;
  email: string;
  rating: number;
  coursesAssigned: number;
  completionRate: number;
  avatar?: string;
}

export interface Batch {
  id: string;
  name: string;
  courseId: string;
  trainerId: string;
  learnerCount: number;
  startDate: string;
  endDate: string;
  progress: number;
}

// Mock users
export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@acme.com",
    dob: "1990-05-15",
    courses: 5,
    phone: "123-456-7890",
    // role: "learner",
    // status: "active",
    // department: "Engineering",
    // lastLogin: "2025-01-10",
    // enrolledCourses: 3,
  },
  {
    id: "2",
    name: "Sarah Wilson",
    email: "sarah.wilson@acme.com",
    dob: "1988-09-22",
    courses: 3,
    phone: "987-654-3210",
    // role: "learner",
    // status: "active",
    // department: "Marketing",
    // lastLogin: "2025-01-12",
    // enrolledCourses: 2,
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@acme.com",
    // role: "trainer",
    // status: "active",
    // department: "Engineering",
    // lastLogin: "2025-01-11",
    dob: "1985-03-30",
    courses: 5,
    phone: "555-123-4567",
  },
];

// Mock courses
export const mockCourses: Course[] = [
  {
    id: "1",
    title: "React Fundamentals",
    description:
      "Learn the basics of React including components, props, and state management",
    status: "published",
    enrolledCount: 124,
    completionRate: 78,
    createdAt: "2024-12-01",
  },
  {
    id: "2",
    title: "Advanced TypeScript",
    description:
      "Master advanced TypeScript concepts including generics, decorators, and more",
    status: "published",
    enrolledCount: 89,
    completionRate: 65,
    createdAt: "2024-11-15",
  },
  {
    id: "3",
    title: "Next.js for Production",
    description: "Build production-ready applications with Next.js",
    status: "draft",
    enrolledCount: 0,
    completionRate: 0,
    createdAt: "2025-01-05",
  },
];

// Mock trainers
export const mockTrainers: Trainer[] = [
  {
    id: "1",
    name: "Michael Brown",
    email: "michael.brown@acme.com",
    rating: 4.8,
    coursesAssigned: 5,
    completionRate: 82,
  },
  {
    id: "2",
    name: "Emily Davis",
    email: "emily.davis@acme.com",
    rating: 4.9,
    coursesAssigned: 3,
    completionRate: 91,
  },
];

// Mock batches
export const mockBatches: Batch[] = [
  {
    id: "1",
    name: "React Fundamentals - Batch 2025-01",
    courseId: "1",
    trainerId: "1",
    learnerCount: 45,
    startDate: "2025-01-15",
    endDate: "2025-03-15",
    progress: 35,
  },
  {
    id: "2",
    name: "TypeScript Advanced - Batch 2025-01",
    courseId: "2",
    trainerId: "2",
    learnerCount: 32,
    startDate: "2025-01-08",
    endDate: "2025-02-28",
    progress: 58,
  },
];
