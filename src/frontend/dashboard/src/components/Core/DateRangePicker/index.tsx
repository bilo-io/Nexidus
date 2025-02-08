import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

interface DateRangePickerProps {
    onChange: (range: { startDate: string; endDate: string }) => void;
    className?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ onChange, className = "" }) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);

        if (start && end) {
            onChange({
                startDate: format(start, "yyyy-MM-dd"),
                endDate: format(end, "yyyy-MM-dd"),
            });
        }
    };

    return (
        <div className={`relative w-full ${className}`}>
            <DatePicker
                selected={startDate}
                onChange={handleChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                isClearable
                placeholderText="Start Date, End Date"
                dateFormat="yyyy-MM-dd"
                className="w-full min-w-64 px-4 py-2 border rounded-lg shadow-sm bg-white text-gray-800 
                   focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
        </div>
    );
};

export default DateRangePicker;
