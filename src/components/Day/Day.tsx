import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

function getCurrentMinutes() {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
}

interface DayProps {
    date: Date;
    isToday: boolean;
}

export function Day({ date, isToday }: DayProps) {
    const d = dayjs(date);
    const dayName = d.format("ddd");
    const dayNumber = d.date();
    const [totalMinutes, setTotalMinutes] = useState(getCurrentMinutes);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isToday) return;
        const id = setInterval(() => setTotalMinutes(getCurrentMinutes()), 60_000);
        return () => clearInterval(id);
    }, [isToday]);

    useEffect(() => {
        if (isToday && lineRef.current) {
            lineRef.current.scrollIntoView({ block: "center" });
        }
    }, [isToday]);

    const topPx = (totalMinutes / 60) * 48;

    return (
        <div className="flex flex-col min-w-0">
            <div
                className={`sticky top-0 z-10 flex flex-col items-center justify-center h-16 border-b border-gray-200 bg-white ${
                    isToday ? "bg-blue-50" : ""
                }`}
            >
                <span className="text-xs text-gray-500 uppercase">{dayName}</span>
                <span
                    className={`text-sm font-semibold ${
                        isToday
                            ? "bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center"
                            : "text-gray-900"
                    }`}
                >
                    {dayNumber}
                </span>
            </div>
            <div className="relative flex-1">
                {isToday && (
                    <div
                        ref={lineRef}
                        className="absolute left-0 right-0 z-20 flex items-center pointer-events-none"
                        style={{ top: `${topPx}px` }}
                    >
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500 -ml-1 shrink-0" />
                        <div className="flex-1 h-0.5 bg-red-500" />
                    </div>
                )}
                {Array.from({ length: 24 }, (_, hour) => (
                    <div
                        key={hour}
                        className={`h-12 border-b border-gray-100 ${isToday ? "bg-blue-50/30" : ""}`}
                    />
                ))}
            </div>
        </div>
    );
}
