import dayjs from "dayjs";

interface DayProps {
    date: Date;
    isToday: boolean;
}

export function Day({ date, isToday }: DayProps) {
    const d = dayjs(date);
    const dayName = d.format("ddd");
    const dayNumber = d.date();

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
