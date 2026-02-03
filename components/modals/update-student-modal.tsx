"use client";

import { useState, useEffect } from "react";
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
import { DateTimePicker } from "@/components/ui/dayjs-datetime-picker";
import {
  StudentsService,
  UpdateStudentData,
  StudentData,
} from "@/services/studentsService";
import { Loader2 } from "lucide-react";
import validationSchema from "@/schema";

interface UpdateStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStudentUpdated?: () => void;
  student: StudentData | null;
}

export function UpdateStudentModal({
  isOpen,
  onClose,
  onStudentUpdated,
  student,
}: UpdateStudentModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik<UpdateStudentData>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      dob: "",
    },
    validationSchema: validationSchema("updateStudent"),
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (!student?.id) return;

      setIsLoading(true);
      try {
        const cleanData: UpdateStudentData = {
          name: values.name.trim(),
          email: values.email.trim(),
          ...(values.phone?.trim() && { phone: values.phone.trim() }),
          ...(values.dob && { dob: values.dob }),
        };

        await StudentsService.updateStudent(student.id, cleanData);

        onClose();
        formik.resetForm();

        setTimeout(() => {
          onStudentUpdated?.();
        }, 100);
      } catch (error: any) {
        console.error("Error updating student:", error);
        formik.setFieldError(
          "email",
          error.message || "Failed to update student. Please try again.",
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Populate form when student data changes
  useEffect(() => {
    if (student && isOpen) {
      formik.setValues({
        name: student.name || "",
        email: student.email || "",
        phone: student.phone || "",
        dob: student.dob || "",
      });
    }
  }, [student, isOpen]);

  const handleClose = () => {
    if (!isLoading) {
      formik.resetForm();
      onClose();
    }
  };

  if (!student) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="sm:max-w-[425px] focus:outline-none"
        onInteractOutside={(e) => {
          if (isLoading) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>Update Student</DialogTitle>
          <DialogDescription>
            Update the student information below. Make changes to the student's
            profile.
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
            <Label htmlFor="phone">Phone (Optional)</Label>
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
            label="Date of Birth (Optional)"
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
                  Updating...
                </>
              ) : (
                "Update Student"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
