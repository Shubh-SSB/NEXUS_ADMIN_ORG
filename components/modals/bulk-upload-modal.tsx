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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Loader2,
  Upload,
  FileText,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StudentsService, CreateStudentData } from "@/services/studentsService";

interface Course {
  id: string;
  name: string;
  code: string;
}

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBulkUploadComplete?: () => void;
}

export function BulkUploadModal({
  isOpen,
  onClose,
  onBulkUploadComplete,
}: BulkUploadModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [uploadStep, setUploadStep] = useState<
    "upload" | "preview" | "processing"
  >("upload");
  const [error, setError] = useState<string | null>(null);

  // Mock courses data - replace with actual API call
  const availableCourses: Course[] = useMemo(
    () => [
      { id: "1", name: "JavaScript Fundamentals", code: "JS101" },
      { id: "2", name: "React Development", code: "REACT101" },
      { id: "3", name: "Node.js Backend", code: "NODE101" },
      { id: "4", name: "Database Design", code: "DB101" },
      { id: "5", name: "Python Programming", code: "PY101" },
      { id: "6", name: "Machine Learning", code: "ML101" },
    ],
    []
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type === "text/csv") {
        setSelectedFile(file);
        setError(null);
      } else {
        setError("Please select a valid CSV file");
        setSelectedFile(null);
      }
    },
    []
  );

  const handleCourseToggle = useCallback((course: Course) => {
    setSelectedCourses((prev) => {
      const isSelected = prev.some((c) => c.id === course.id);
      if (isSelected) {
        return prev.filter((c) => c.id !== course.id);
      } else {
        return [...prev, course];
      }
    });
  }, []);

  const parseCsvFile = useCallback((file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;

          // Simple CSV parsing (handles basic cases)
          const lines = text.split("\n").filter((line) => line.trim());

          if (lines.length < 2) {
            reject(
              new Error(
                "CSV file must have at least a header row and one data row"
              )
            );
            return;
          }

          // Parse CSV with proper handling of quotes and commas
          const parseCsvLine = (line: string): string[] => {
            const result: string[] = [];
            let current = "";
            let inQuotes = false;

            for (let i = 0; i < line.length; i++) {
              const char = line[i];
              if (char === '"') {
                inQuotes = !inQuotes;
              } else if (char === "," && !inQuotes) {
                result.push(current.trim());
                current = "";
              } else {
                current += char;
              }
            }
            result.push(current.trim());
            return result;
          };

          const headers = parseCsvLine(lines[0]).map((h) =>
            h.replace(/"/g, "")
          );
          const rows = lines.slice(1).map((line) => {
            const values = parseCsvLine(line).map((v) => v.replace(/"/g, ""));
            const row: any = {};
            headers.forEach((header, index) => {
              row[header] = values[index] || "";
            });
            return row;
          });

          // Validate required fields
          const requiredFields = ["name", "email"];
          const hasRequiredFields = requiredFields.every((field) =>
            headers.some((header) =>
              header.toLowerCase().includes(field.toLowerCase())
            )
          );

          if (!hasRequiredFields) {
            reject(new Error("CSV must contain 'name' and 'email' columns"));
            return;
          }

          resolve(rows);
        } catch (error) {
          reject(
            new Error(
              "Failed to parse CSV file. Please ensure it's properly formatted."
            )
          );
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    });
  }, []);

  const handlePreviewData = useCallback(async () => {
    if (!selectedFile || selectedCourses.length === 0) {
      setError("Please select both a CSV file and at least one course");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const rawData = await parseCsvFile(selectedFile);

      // Add enrolledCourses column with selected courses
      const courseCodes = selectedCourses.map((course) => course.code);
      const processedData = rawData.map((row) => ({
        ...row,
        enrolledCourses: courseCodes,
      }));

      setCsvData(rawData);
      setPreviewData(processedData.slice(0, 5)); // Show first 5 rows for preview
      setUploadStep("preview");
    } catch (err: any) {
      setError(err.message || "Failed to process CSV file");
    } finally {
      setIsLoading(false);
    }
  }, [selectedFile, selectedCourses, parseCsvFile]);

  const handleBulkUpload = useCallback(async () => {
    if (csvData.length === 0) return;

    setIsLoading(true);
    setUploadStep("processing");

    try {
      // Process the data with enrolled courses
      const courseCodes = selectedCourses.map((course) => course.code);
      const studentsToCreate: CreateStudentData[] = csvData.map((row) => ({
        name: row.name || row.Name || "",
        email: row.email || row.Email || "",
        phone: row.phone || row.Phone || "",
        dob: row.dob || row.DOB || row["Date of Birth"] || "",
        password: row.password || row.Password || "defaultPassword123",
        enrolledCourses: courseCodes,
      }));

      // Call the bulk upload API
      await StudentsService.bulkCreateStudents(studentsToCreate);

      // Reset form and close modal
      handleClose();
      onBulkUploadComplete?.();
    } catch (err: any) {
      setError(err.message || "Failed to upload students");
      setUploadStep("preview");
    } finally {
      setIsLoading(false);
    }
  }, [csvData, selectedCourses, onBulkUploadComplete]);

  const handleClose = useCallback(() => {
    if (!isLoading) {
      setSelectedFile(null);
      setSelectedCourses([]);
      setCsvData([]);
      setPreviewData([]);
      setUploadStep("upload");
      setError(null);
      onClose();
    }
  }, [isLoading, onClose]);

  const handleBackToUpload = useCallback(() => {
    setUploadStep("upload");
    setPreviewData([]);
    setCsvData([]);
    setError(null);
  }, []);

  const renderUploadStep = () => (
    <div className="space-y-6">
      {/* Course Selection */}
      <div className="space-y-3">
        <Label>
          Select Courses <span className="text-red-500">*</span>
        </Label>
        <div className="border rounded-md p-3 max-h-40 overflow-y-auto">
          {availableCourses.map((course) => (
            <div key={course.id} className="flex items-center space-x-2 py-2">
              <Checkbox
                id={course.id}
                checked={selectedCourses.some((c) => c.id === course.id)}
                onCheckedChange={() => handleCourseToggle(course)}
              />
              <Label
                htmlFor={course.id}
                className="text-sm cursor-pointer flex-1"
              >
                {course.name} ({course.code})
              </Label>
            </div>
          ))}
        </div>

        {selectedCourses.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedCourses.map((course) => (
              <Badge key={course.id} variant="secondary">
                {course.code}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* File Upload */}
      <div className="space-y-2">
        <Label htmlFor="csvFile">
          CSV File <span className="text-red-500">*</span>
        </Label>
        <div className="flex items-center space-x-2">
          <Input
            id="csvFile"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            disabled={isLoading}
          />
          {selectedFile && (
            <div className="flex items-center text-sm text-green-600">
              <FileText className="h-4 w-4 mr-1" />
              {selectedFile.name}
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          CSV should contain columns: name, email, phone, dob (optional),
          password (optional)
        </p>
      </div>
    </div>
  );

  const renderPreviewStep = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">
          Preview Data ({csvData.length} students)
        </h4>
        <Badge variant="outline">
          {selectedCourses.length} course
          {selectedCourses.length !== 1 ? "s" : ""} selected
        </Badge>
      </div>

      <div className="border rounded-md overflow-hidden">
        <div className="max-h-60 overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                {previewData[0] &&
                  Object.keys(previewData[0]).map((header) => (
                    <th key={header} className="px-3 py-2 text-left border-b">
                      {header}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {previewData.map((row, index) => (
                <tr key={index} className="border-b">
                  {Object.values(row).map((value, colIndex) => (
                    <td key={colIndex} className="px-3 py-2">
                      {Array.isArray(value) ? value.join(", ") : String(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {csvData.length > 5 && (
        <p className="text-xs text-muted-foreground">
          Showing first 5 rows of {csvData.length} total students
        </p>
      )}
    </div>
  );

  const renderProcessingStep = () => (
    <div className="text-center py-8">
      <Loader2 className="h-8 w-8 mx-auto mb-4 animate-spin text-blue-500" />
      <h4 className="font-medium mb-2">Processing Upload</h4>
      <p className="text-sm text-muted-foreground">
        Creating {csvData.length} students with selected courses...
      </p>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="sm:max-w-[600px] focus:outline-none"
        onInteractOutside={(e) => {
          if (isLoading) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>Bulk Upload Students</DialogTitle>
          <DialogDescription>
            {uploadStep === "upload" &&
              "Select courses and upload a CSV file to create multiple students at once."}
            {uploadStep === "preview" && "Review the data before uploading."}
            {uploadStep === "processing" && "Processing your bulk upload..."}
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 rounded-md">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        {uploadStep === "upload" && renderUploadStep()}
        {uploadStep === "preview" && renderPreviewStep()}
        {uploadStep === "processing" && renderProcessingStep()}

        <DialogFooter>
          {uploadStep === "upload" && (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handlePreviewData}
                disabled={
                  isLoading || !selectedFile || selectedCourses.length === 0
                }
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Preview Data
                  </>
                )}
              </Button>
            </>
          )}

          {uploadStep === "preview" && (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={handleBackToUpload}
                disabled={isLoading}
              >
                Back
              </Button>
              <Button onClick={handleBulkUpload} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Upload {csvData.length} Students
                  </>
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
