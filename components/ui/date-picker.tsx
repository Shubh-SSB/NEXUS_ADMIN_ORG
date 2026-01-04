"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  value?: string;
  onChange: (date: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
  error?: string;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function DatePicker({
  value,
  onChange,
  placeholder = "Select date",
  disabled = false,
  className = "",
  label,
  error,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-CA"); // Returns YYYY-MM-DD format
  };

  const formatDisplayDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDaysInMonth = (date: Date): (Date | null)[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onChange(formatDate(date));
    setIsOpen(false);
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date): boolean => {
    return selectedDate
      ? date.toDateString() === selectedDate.toDateString()
      : false;
  };

  return (
    <div className="space-y-2">
      {label && (
        <Label>
          {label} {label.includes("*") ? "" : ""}
        </Label>
      )}
      <div className="relative" ref={containerRef}>
        <div
          className={cn(
            "flex items-center gap-2 px-3 py-2 border border-input bg-background rounded-md cursor-pointer hover:bg-accent/50 transition-colors",
            disabled && "opacity-50 cursor-not-allowed",
            error && "border-red-500",
            className
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span
            className={cn(
              "flex-1 text-sm",
              !selectedDate && "text-muted-foreground"
            )}
          >
            {selectedDate ? formatDisplayDate(selectedDate) : placeholder}
          </span>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        {isOpen && !disabled && (
          <div className="absolute top-full left-0 z-50 mt-1 bg-popover border border-border rounded-md shadow-lg p-3 w-64 max-h-80 overflow-hidden">
            {/* Month/Year Header */}
            <div className="flex items-center justify-between mb-3 sticky top-0 bg-popover z-10">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth("prev")}
                className="h-7 w-7 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">
                {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth("next")}
                className="h-7 w-7 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="h-7 flex items-center justify-center text-xs text-muted-foreground font-medium"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(currentDate).map((date, index) => (
                <Button
                  key={index}
                  type="button"
                  variant={date && isSelected(date) ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "h-7 w-7 p-0 font-normal",
                    !date && "invisible",
                    date &&
                      isToday(date) &&
                      !isSelected(date) &&
                      "bg-accent text-accent-foreground",
                    date &&
                      isSelected(date) &&
                      "bg-primary text-primary-foreground"
                  )}
                  onClick={() => date && handleDateSelect(date)}
                  disabled={!date}
                >
                  {date?.getDate()}
                </Button>
              ))}
            </div>
          </div>
        )}
        {/* Quick Actions */}
        <div className="mt-3 pt-3 border-t border-border sticky bottom-0 bg-popover">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-full h-7 text-xs"
            onClick={() => handleDateSelect(new Date())}
          >
            Today
          </Button>
        </div>
      </div>
    </div>
  );
}
