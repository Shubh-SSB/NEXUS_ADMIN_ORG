"use client";

import { useState, useEffect, useCallback } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateTimePicker } from "@/components/ui/dayjs-datetime-picker";
import {
  StudentsService,
  CreateStudentData,
  AssignedCourse,
} from "@/services/studentsService";
import { Loader2 } from "lucide-react";
import validationSchema from "@/schema";

interface CreateStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStudentCreated?: () => void;
}

export function CreateStudentModal({
  isOpen,
  onClose,
  onStudentCreated,
}: CreateStudentModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState<AssignedCourse[]>([]);
  const [selectValue, setSelectValue] = useState("");

  // Fetch courses when modal opens
  useEffect(() => {
    if (isOpen) {
      StudentsService.fetchAvailableCourses().then(setCourses);
    }
  }, [isOpen]);

  const formik = useFormik<CreateStudentData>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      dob: "",
      enrollCourses: [],
    },
    validationSchema: validationSchema("createStudent"),
    onSubmit: async (values) => {
      // let isSuccess = false;
      setIsLoading(true);

      const cleanData: CreateStudentData = {
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone?.trim() || "",
        dob: values.dob,
        enrollCourses: values.enrollCourses || [],
      };

      try {
        await StudentsService.createStudent(cleanData);
        handleClose();
        // isSuccess = true;
      } catch (error) {
      } finally {
      }
    },
  });

  const handleClose = useCallback(() => {
    if (!isLoading) {
      setIsLoading(false);
      formik.resetForm();
      setSelectValue("");
      onClose();
    }
  }, [isLoading, onClose]);

  const handleCourseToggle = (courseId: number) => {
    const selected = formik.values.enrollCourses || [];
    const updated = selected.includes(courseId)
      ? selected.filter((id) => id !== courseId)
      : [...selected, courseId];
    formik.setFieldValue("enrollCourses", updated);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="sm:max-w-106.25 focus:outline-none"
        onInteractOutside={(e) => {
          if (isLoading) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>Create New Student</DialogTitle>
          <DialogDescription>
            Add a new student to your organization. Fill in the required
            information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter student name"
              className={
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : ""
              }
              disabled={isLoading}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-sm text-red-500">{formik.errors.name}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter email address"
              className={
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : ""
              }
              disabled={isLoading}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-500">{formik.errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter phone number"
              className={
                formik.touched.phone && formik.errors.phone
                  ? "border-red-500"
                  : ""
              }
              disabled={isLoading}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-sm text-red-500">{formik.errors.phone}</p>
            )}
          </div>
          <DateTimePicker
            label="Date of Birth"
            value={formik.values.dob}
            onChange={(date) => formik.setFieldValue("dob", date)}
            placeholder="Select date of birth"
            disabled={isLoading}
            error={
              formik.touched.dob && formik.errors.dob
                ? formik.errors.dob
                : undefined
            }
            format="YYYY-MM-DD"
            showTime={false}
          />
          <div className="space-y-2">
            <Label>Assigned Courses</Label>
            <Select
              disabled={isLoading}
              value={selectValue}
              onValueChange={(courseId) => {
                handleCourseToggle(Number(courseId));
                setSelectValue("");
              }}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={`Select courses (${
                    formik.values.enrollCourses?.length || 0
                  } selected)`}
                />
              </SelectTrigger>
              <SelectContent>
                {courses.map((assignedCourse, index) => (
                  <SelectItem
                    key={index}
                    value={assignedCourse.course.id.toString()}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{assignedCourse.course.name}</span>
                      <span className="ml-2 text-xs text-gray-500">
                        ({assignedCourse.remainingToken} tokens)
                      </span>
                      {formik.values.enrollCourses?.includes(
                        assignedCourse.course.id,
                      ) && " ✓"}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.values.enrollCourses &&
              formik.values.enrollCourses.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {formik.values.enrollCourses.map((courseId) => {
                    const assignedCourse = courses.find(
                      (ac) => ac.course.id === courseId,
                    );
                    return (
                      assignedCourse && (
                        <span
                          key={courseId}
                          className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded flex items-center gap-1"
                        >
                          <span>{assignedCourse.course.name}</span>
                          <span className="text-blue-600">
                            ({assignedCourse.remainingToken})
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCourseToggle(courseId)}
                            className="ml-1 hover:text-blue-900"
                          >
                            ×
                          </button>
                        </span>
                      )
                    );
                  })}
                </div>
              )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Student"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
