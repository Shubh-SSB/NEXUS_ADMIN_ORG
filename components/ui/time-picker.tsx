"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Clock, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimePickerProps {
  value?: string; // Format: "HH:MM"
  onChange: (time: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
  error?: string;
  format24?: boolean; // true for 24-hour, false for 12-hour
}

export function TimePicker({
  value,
  onChange,
  placeholder = "Select time",
  disabled = false,
  className = "",
  label,
  error,
  format24 = true,
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState(
    value ? parseInt(value.split(":")[0]) : 12
  );
  const [minutes, setMinutes] = useState(
    value ? parseInt(value.split(":")[1] || "0") : 0
  );
  const [period, setPeriod] = useState<"AM" | "PM">("AM");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const [h, m] = value.split(":").map(Number);
      if (!format24 && h > 12) {
        setHours(h - 12);
        setPeriod("PM");
      } else if (!format24 && h === 0) {
        setHours(12);
        setPeriod("AM");
      } else {
        setHours(format24 ? h : h);
        setPeriod(h >= 12 ? "PM" : "AM");
      }
      setMinutes(m || 0);
    }
  }, [value, format24]);

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

  const formatTime = (): string => {
    if (format24) {
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
    } else {
      const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
      return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
    }
  };

  const handleTimeChange = () => {
    let finalHours = hours;
    if (!format24) {
      if (period === "PM" && hours !== 12) {
        finalHours = hours + 12;
      } else if (period === "AM" && hours === 12) {
        finalHours = 0;
      }
    }

    const timeString = `${finalHours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    onChange(timeString);
    setIsOpen(false);
  };

  const adjustValue = (
    type: "hours" | "minutes" | "period",
    direction: "up" | "down"
  ) => {
    if (type === "hours") {
      const maxHours = format24 ? 23 : 12;
      const minHours = format24 ? 0 : 1;

      if (direction === "up") {
        setHours((prev) => (prev >= maxHours ? minHours : prev + 1));
      } else {
        setHours((prev) => (prev <= minHours ? maxHours : prev - 1));
      }
    } else if (type === "minutes") {
      if (direction === "up") {
        setMinutes((prev) => (prev >= 59 ? 0 : prev + 1));
      } else {
        setMinutes((prev) => (prev <= 0 ? 59 : prev - 1));
      }
    } else if (type === "period" && !format24) {
      setPeriod((prev) => (prev === "AM" ? "PM" : "AM"));
    }
  };

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
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
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span
            className={cn("flex-1 text-sm", !value && "text-muted-foreground")}
          >
            {value ? formatTime() : placeholder}
          </span>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        {isOpen && !disabled && (
          <div className="absolute top-full left-0 z-50 mt-1 bg-popover border border-border rounded-md shadow-lg p-3 w-40 max-h-64 overflow-hidden transform -translate-x-0 sm:-translate-x-1/2 sm:left-1/2">
            <div className="flex items-center justify-center space-x-2">
              {/* Hours */}
              <div className="flex flex-col items-center">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => adjustValue("hours", "up")}
                  className="h-6 w-8 p-0"
                >
                  <ChevronUp className="h-3 w-3" />
                </Button>
                <div className="h-10 w-12 flex items-center justify-center text-lg font-mono border rounded">
                  {format24 ? hours.toString().padStart(2, "0") : hours}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => adjustValue("hours", "down")}
                  className="h-6 w-8 p-0"
                >
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </div>

              <div className="text-lg font-mono pt-4">:</div>

              {/* Minutes */}
              <div className="flex flex-col items-center">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => adjustValue("minutes", "up")}
                  className="h-6 w-8 p-0"
                >
                  <ChevronUp className="h-3 w-3" />
                </Button>
                <div className="h-10 w-12 flex items-center justify-center text-lg font-mono border rounded">
                  {minutes.toString().padStart(2, "0")}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => adjustValue("minutes", "down")}
                  className="h-6 w-8 p-0"
                >
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </div>

              {/* AM/PM for 12-hour format */}
              {!format24 && (
                <>
                  <div className="w-2" />
                  <div className="flex flex-col items-center">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => adjustValue("period", "up")}
                      className="h-6 w-12 p-0"
                    >
                      <ChevronUp className="h-3 w-3" />
                    </Button>
                    <div className="h-10 w-12 flex items-center justify-center text-sm font-mono border rounded">
                      {period}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => adjustValue("period", "down")}
                      className="h-6 w-12 p-0"
                    >
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </div>
                </>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-border flex gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="flex-1 h-8 text-xs"
                onClick={() => {
                  const now = new Date();
                  setHours(
                    format24
                      ? now.getHours()
                      : now.getHours() > 12
                      ? now.getHours() - 12
                      : now.getHours()
                  );
                  setMinutes(now.getMinutes());
                  if (!format24) {
                    setPeriod(now.getHours() >= 12 ? "PM" : "AM");
                  }
                }}
              >
                Now
              </Button>
              <Button
                type="button"
                variant="default"
                size="sm"
                className="flex-1 h-8 text-xs"
                onClick={handleTimeChange}
              >
                OK
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
