"use client";

import { useState } from "react";
import { DatePicker } from "./date-picker";
import { TimePicker } from "./time-picker";
import { Label } from "./label";

interface DateTimePickerProps {
  value?: string; // ISO string or date string
  onChange: (datetime: string) => void;
  dateLabel?: string;
  timeLabel?: string;
  disabled?: boolean;
  showTime?: boolean;
  format24?: boolean;
  className?: string;
  error?: string;
}

export function DateTimePicker({
  value,
  onChange,
  dateLabel = "Date",
  timeLabel = "Time",
  disabled = false,
  showTime = true,
  format24 = true,
  className = "",
  error,
}: DateTimePickerProps) {
  // Parse existing value
  const parseValue = () => {
    if (!value) return { date: "", time: "" };

    const dateObj = new Date(value);
    if (isNaN(dateObj.getTime())) return { date: "", time: "" };

    const date = dateObj.toLocaleDateString("en-CA"); // YYYY-MM-DD
    const time = `${dateObj.getHours().toString().padStart(2, "0")}:${dateObj
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    return { date, time };
  };

  const { date: initialDate, time: initialTime } = parseValue();
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(initialTime);

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    updateDateTime(newDate, time);
  };

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
    updateDateTime(date, newTime);
  };

  const updateDateTime = (dateValue: string, timeValue: string) => {
    if (!dateValue) {
      onChange("");
      return;
    }

    if (!showTime || !timeValue) {
      // Just date
      onChange(dateValue);
      return;
    }

    // Combine date and time
    const [hours, minutes] = timeValue.split(":").map(Number);
    const dateTime = new Date(dateValue);
    dateTime.setHours(hours, minutes, 0, 0);

    onChange(dateTime.toISOString());
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <DatePicker
        label={dateLabel}
        value={date}
        onChange={handleDateChange}
        disabled={disabled}
        error={error && !date ? error : ""}
      />

      {showTime && (
        <TimePicker
          label={timeLabel}
          value={time}
          onChange={handleTimeChange}
          disabled={disabled || !date}
          format24={format24}
          placeholder={!date ? "Select date first" : "Select time"}
        />
      )}
    </div>
  );
}
