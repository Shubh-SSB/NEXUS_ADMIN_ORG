"use client";

import { useState, useCallback, useEffect } from "react";
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
  const [formData, setFormData] = useState<CreateStudentData>({
    name: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    enrollCourses: [],
  });
  const [errors, setErrors] = useState<Partial<CreateStudentData>>({});

  // Fetch courses when modal opens
  useEffect(() => {
    if (isOpen) {
      StudentsService.fetchAvailableCourses().then(setCourses);
    }
  }, [isOpen]);

  const handleInputChange = useCallback(
    (field: keyof CreateStudentData, value: string | string[]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
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

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = "Phone is required";
    } else {
      const phoneDigits = formData.phone.replace(/\D/g, "");
      if (phoneDigits.length !== 10) {
        newErrors.phone = "Phone number must be exactly 10 digits.";
      }
    }

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

    const cleanData: CreateStudentData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
      phone: formData.phone?.trim() || "",
      dob: formData.dob,
      enrollCourses: formData.enrollCourses || [],
    };

    try {
      await StudentsService.createStudent(cleanData);

      // Success - close modal and reset
      onClose();
      setFormData({
        name: "",
        email: "",
        phone: "",
        dob: "",
        password: "",
        enrollCourses: [],
      });
      setErrors({});

      setTimeout(() => onStudentCreated?.(), 100);
    } catch (error) {
      // Let CRUD factory handle notifications
      console.error("Student creation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        dob: "",
        password: "",
        enrollCourses: [],
      });
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
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
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
          <div className="space-y-2">
            <Label>Assigned Courses</Label>
            <Select
              disabled={isLoading}
              onValueChange={(courseId) => {
                const selected = formData.enrollCourses || [];
                const updated = selected.includes(courseId)
                  ? selected.filter((id) => id !== courseId)
                  : [...selected, courseId];
                handleInputChange("enrollCourses", updated);
              }}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={`Select courses (${
                    formData.enrollCourses?.length || 0
                  } selected)`}
                />
              </SelectTrigger>
              <SelectContent>
                {courses.map((assignedCourse) => (
                  <SelectItem
                    key={assignedCourse.id}
                    value={assignedCourse.course.id.toString()}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{assignedCourse.course.name}</span>
                      <span className="ml-2 text-xs text-gray-500">
                        ({assignedCourse.remainingToken} tokens)
                      </span>
                      {formData.enrollCourses?.includes(
                        assignedCourse.course.id.toString()
                      ) && " ✓"}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formData.enrollCourses?.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {formData.enrollCourses.map((courseId) => {
                  const assignedCourse = courses.find(
                    (ac) => ac.course.id.toString() === courseId
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
                          onClick={() =>
                            handleInputChange(
                              "enrollCourses",
                              formData.enrollCourses.filter(
                                (id) => id !== courseId
                              )
                            )
                          }
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
