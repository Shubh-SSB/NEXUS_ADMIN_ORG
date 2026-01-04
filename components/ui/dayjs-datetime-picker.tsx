"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

interface DateTimePickerProps {
  value?: string;
  onChange: (datetime: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: string;
  format?: string; // dayjs format string
  showTime?: boolean;
}

export function DateTimePicker({
  value,
  onChange,
  label,
  placeholder = "Select date and time",
  disabled = false,
  className = "",
  error,
  format = "YYYY-MM-DD HH:mm",
  showTime = true,
}: DateTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [tempDate, setTempDate] = useState(dayjs());
  const [showAbove, setShowAbove] = useState(false);
  const [showYearSelect, setShowYearSelect] = useState(false);
  const [showMonthSelect, setShowMonthSelect] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const parsed = dayjs(value);
      if (parsed.isValid()) {
        setInputValue(parsed.format(format));
        setTempDate(parsed);
      }
    } else {
      setInputValue("");
    }
  }, [value, format]);

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

  // Smart positioning effect
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;

      // Estimated height of the popover (adjust based on showTime)
      const popoverHeight = showTime ? 450 : 350;

      // Show above if not enough space below but enough space above
      if (spaceBelow < popoverHeight && spaceAbove > popoverHeight) {
        setShowAbove(true);
      } else {
        setShowAbove(false);
      }
    }
  }, [isOpen, showTime]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setInputValue(inputVal);

    // Try to parse the input
    const parsed = dayjs(inputVal, format, true);
    if (parsed.isValid()) {
      setTempDate(parsed);
      onChange(parsed.format(format));
    }
  };

  const handleDateSelect = (date: dayjs.Dayjs) => {
    // Preserve time if it exists
    const newDate = showTime
      ? date.hour(tempDate.hour()).minute(tempDate.minute())
      : date;

    setTempDate(newDate);
    setInputValue(newDate.format(format));
    onChange(newDate.format(format));

    if (!showTime) {
      setIsOpen(false);
    }
  };

  const handleTimeChange = (type: "hour" | "minute", value: number) => {
    const newDate = tempDate[type](value);
    setTempDate(newDate);
    setInputValue(newDate.format(format));
    onChange(newDate.format(format));
  };

  const handleToday = () => {
    const now = dayjs();
    setTempDate(now);
    setInputValue(now.format(format));
    onChange(now.format(format));
    setIsOpen(false);
  };

  const handleClear = () => {
    setInputValue("");
    onChange("");
    setIsOpen(false);
  };

  const generateCalendarDays = () => {
    const startOfMonth = tempDate.startOf("month");
    const endOfMonth = tempDate.endOf("month");
    const startOfWeek = startOfMonth.startOf("week");
    const endOfWeek = endOfMonth.endOf("week");

    const days = [];
    let current = startOfWeek;

    while (current.isBefore(endOfWeek) || current.isSame(endOfWeek, "day")) {
      days.push(current);
      current = current.add(1, "day");
    }

    return days;
  };

  const generateYearRange = () => {
    const currentYear = dayjs().year();
    const years = [];
    for (let year = currentYear - 50; year <= currentYear + 10; year++) {
      years.push(year);
    }
    return years;
  };

  const months = [
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

  const handleYearSelect = (year: number) => {
    setTempDate(tempDate.year(year));
    setShowYearSelect(false);
  };

  const handleMonthSelect = (monthIndex: number) => {
    setTempDate(tempDate.month(monthIndex));
    setShowMonthSelect(false);
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <div className="relative" ref={containerRef}>
        <div className="relative">
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            disabled={disabled}
            className={cn("pr-10", error && "border-red-500", className)}
            onFocus={() => setIsOpen(true)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-1">
            <Calendar
              className="h-4 w-4 text-muted-foreground cursor-pointer"
              onClick={() => !disabled && setIsOpen(!isOpen)}
            />
            {showTime && <Clock className="h-4 w-4 text-muted-foreground" />}
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        {isOpen && !disabled && (
          <div
            ref={popoverRef}
            className={cn(
              "absolute z-50 bg-popover border border-border rounded-md shadow-lg p-4 w-80 max-h-96 overflow-y-auto",
              showAbove ? "bottom-full mb-1 left-0" : "top-full mt-1 left-0",
              // Adjust horizontal position if it would overflow
              "sm:right-0 sm:left-auto"
            )}
            style={{
              // Ensure it doesn't go off-screen horizontally
              transform: "translateX(0)",
            }}
          >
            {/* Month/Year Navigation */}
            <div className="relative mb-4">
              {showYearSelect ? (
                <div className="bg-background border border-border rounded-md p-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Select Year</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowYearSelect(false)}
                      className="h-6 w-6 p-0"
                    >
                      ×
                    </Button>
                  </div>
                  <div className="grid grid-cols-4 gap-1 max-h-32 overflow-y-auto">
                    {generateYearRange().map((year) => (
                      <Button
                        key={year}
                        type="button"
                        variant={year === tempDate.year() ? "default" : "ghost"}
                        size="sm"
                        onClick={() => handleYearSelect(year)}
                        className="h-8 text-xs"
                      >
                        {year}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : showMonthSelect ? (
                <div className="bg-background border border-border rounded-md p-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Select Month</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowMonthSelect(false)}
                      className="h-6 w-6 p-0"
                    >
                      ×
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {months.map((month, index) => (
                      <Button
                        key={month}
                        type="button"
                        variant={
                          index === tempDate.month() ? "default" : "ghost"
                        }
                        size="sm"
                        onClick={() => handleMonthSelect(index)}
                        className="h-8 text-xs"
                      >
                        {month.slice(0, 3)}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setTempDate(tempDate.subtract(1, "month"))}
                  >
                    ‹
                  </Button>
                  <div className="flex items-center space-x-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowMonthSelect(true)}
                      className="font-medium hover:bg-accent"
                    >
                      {tempDate.format("MMMM")}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowYearSelect(true)}
                      className="font-medium hover:bg-accent"
                    >
                      {tempDate.format("YYYY")}
                    </Button>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setTempDate(tempDate.add(1, "month"))}
                  >
                    ›
                  </Button>
                </div>
              )}
            </div>

            {/* Calendar - Only show when not selecting month/year */}
            {!showYearSelect && !showMonthSelect && (
              <>
                {/* Days of Week */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <div
                      key={day}
                      className="h-8 flex items-center justify-center text-xs font-medium text-muted-foreground"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {calendarDays.map((day) => {
                    const isCurrentMonth = day.month() === tempDate.month();
                    const isSelected = value
                      ? day.isSame(dayjs(value), "day")
                      : false;
                    const isToday = day.isSame(dayjs(), "day");

                    return (
                      <Button
                        key={day.format("YYYY-MM-DD")}
                        type="button"
                        variant={isSelected ? "default" : "ghost"}
                        size="sm"
                        className={cn(
                          "h-8 w-8 p-0",
                          !isCurrentMonth && "text-muted-foreground opacity-50",
                          isToday &&
                            !isSelected &&
                            "bg-accent text-accent-foreground"
                        )}
                        onClick={() => handleDateSelect(day)}
                      >
                        {day.date()}
                      </Button>
                    );
                  })}
                </div>
              </>
            )}

            {/* Time Selection - Only show when not selecting month/year */}
            {showTime && !showYearSelect && !showMonthSelect && (
              <div className="border-t pt-3 mb-3">
                <div className="flex items-center justify-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleTimeChange("hour", (tempDate.hour() + 1) % 24)
                      }
                      className="h-6 w-6 p-0"
                    >
                      ▲
                    </Button>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleTimeChange("minute", (tempDate.minute() + 1) % 60)
                      }
                      className="h-6 w-6 p-0"
                    >
                      ▲
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-2 my-2">
                  <div className="text-center">
                    <div className="text-lg font-mono w-12 text-center">
                      {tempDate.format("HH")}
                    </div>
                    <div className="text-xs text-muted-foreground">Hour</div>
                  </div>
                  <div className="text-lg">:</div>
                  <div className="text-center">
                    <div className="text-lg font-mono w-12 text-center">
                      {tempDate.format("mm")}
                    </div>
                    <div className="text-xs text-muted-foreground">Min</div>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      handleTimeChange("hour", (tempDate.hour() - 1 + 24) % 24)
                    }
                    className="h-6 w-6 p-0"
                  >
                    ▼
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      handleTimeChange(
                        "minute",
                        (tempDate.minute() - 1 + 60) % 60
                      )
                    }
                    className="h-6 w-6 p-0"
                  >
                    ▼
                  </Button>
                </div>
              </div>
            )}

            {/* Actions - Only show when not selecting month/year */}
            {!showYearSelect && !showMonthSelect && (
              <div className="flex justify-between border-t pt-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleClear}
                >
                  Clear
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleToday}
                >
                  {showTime ? "Now" : "Today"}
                </Button>
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  Done
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
