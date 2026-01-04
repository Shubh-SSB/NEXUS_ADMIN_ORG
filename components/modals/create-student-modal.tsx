"use client";

import { useState, useCallback, useMemo } from "react";
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
import { StudentsService, CreateStudentData } from "@/services/studentsService";
import { Loader2 } from "lucide-react";

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
  const [formData, setFormData] = useState<CreateStudentData>({
    name: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<CreateStudentData>>({});

  const handleInputChange = useCallback(
    (field: keyof CreateStudentData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    },
    [errors]
  );

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateStudentData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation (optional but if provided should be valid)
    if (formData.phone && formData.phone.trim()) {
      const phoneDigits = formData.phone.replace(/\D/g, "");
      if (phoneDigits.length !== 10) {
        newErrors.phone = "Phone number must be exactly 10 digits.";
      }
    }

    // DOB validation (optional but if provided should be valid date)
    if (formData.dob && !Date.parse(formData.dob)) {
      newErrors.dob = "Please enter a valid date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Filter out empty optional fields
      const cleanData: CreateStudentData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        phone: formData.phone?.trim(),
        dob: formData.dob,
      };

      await StudentsService.createStudent(cleanData);

      // Optimistic update - close modal immediately
      onClose();

      // Reset form
      setFormData({ name: "", email: "", phone: "", dob: "", password: "" });
      setErrors({});

      // Notify parent component after modal closes
      setTimeout(() => {
        onStudentCreated?.();
      }, 100);
    } catch (error: any) {
      console.error("Error creating student:", error);
      // Show error on email field as general error location
      setErrors({
        email: error.message || "Failed to create student. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setFormData({ name: "", email: "", phone: "", dob: "", password: "" });
      setErrors({});
      onClose();
    }
  };

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
          <DialogTitle>Create New Student</DialogTitle>
          <DialogDescription>
            Add a new student to your organization. Fill in the required
            information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter student name"
              className={errors.name ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter email address"
              className={errors.email ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>{" "}
          <div className="space-y-2">
            <Label htmlFor="email">
              Password <span className="text-red-500">*</span>
            </Label>
            <Input
              id="passsword"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="Enter password"
              className={errors.password ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="Enter phone number"
              className={errors.phone ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone}</p>
            )}
          </div>
          <DateTimePicker
            label="Date of Birth"
            value={formData.dob}
            onChange={(date) => handleInputChange("dob", date)}
            placeholder="Select date of birth"
            disabled={isLoading}
            error={errors.dob}
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
