import dayjs from "dayjs";

import { Day } from "@/components/Calendar/Day/Day";
import { HoursScale } from "@/components/Calendar/Week/HoursScale";
import {getWeekDays} from "@/dateService/collectionGenerator.ts";

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
                <HoursScale />
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
