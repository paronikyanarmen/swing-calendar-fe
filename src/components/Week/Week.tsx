import dayjs from "dayjs";

import { getWeekDays } from "@/date";
import { Day } from "@/components/Day/Day";

const HOURS = Array.from({ length: 24 }, (_, i) => i);

interface WeekProps {
    currentDate: Date;
    selectedWeek: Date;
}

export function Week({ currentDate, selectedWeek }: WeekProps) {
    const days = getWeekDays(selectedWeek);
    const todayStr = dayjs(currentDate).format("YYYY-MM-DD");

    return (
        <div className="flex-1 overflow-y-auto">
            <div className="flex">
                <div className="flex flex-col shrink-0 w-14 border-r border-gray-200">
                    <div className="sticky top-0 z-10 border-b border-gray-200 bg-white h-16 shrink-0" />
                    <div>
                        {HOURS.map((hour) => (
                            <div
                                key={hour}
                                className="h-12 relative"
                            >
                                {hour > 0 && (
                                    <span className="absolute -top-2 right-2 text-xs text-gray-400">
                                        {`${hour}:00`}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-7 flex-1">
                    {days.map((date) => (
                        <Day
                            key={date.toISOString()}
                            date={date}
                            isToday={dayjs(date).format("YYYY-MM-DD") === todayStr}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
