import {useState} from "react";
import {getMonthCalendarGrid} from "@/dateService/collectionGenerator.ts";
import {getPreviousMonday, getNextMonth, getPrevMonth} from "@/dateService/math.ts";
import {isSameDay} from "@/dateService/comparator.ts";
import {getMonthAndYearLabel} from "@/dateService/formatter.ts";


const WEEKDAY_LABELS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

interface MiniCalendarProps {
    currentDate: Date;
    selectedWeek: Date;
    setSelectedWeek: (week: Date) => void;
}

function changeSelectedMonthOnSelectedWeekChange(
    selectedWeek: Date,
    prevWeek: Date,
    setPrevWeek: (value: (((prevState: Date) => Date) | Date)) => void,
    miniCalendarSelectedMonth: Date,
    setMiniCalendarSelectedMonth: (value: (((prevState: Date) => Date) | Date)) => void
) {
    if (selectedWeek !== prevWeek) {
        setPrevWeek(selectedWeek);
        if (
            selectedWeek.getMonth() !== miniCalendarSelectedMonth.getMonth() ||
            selectedWeek.getFullYear() !== miniCalendarSelectedMonth.getFullYear()
        ) {
            setMiniCalendarSelectedMonth(new Date(selectedWeek.getFullYear(), selectedWeek.getMonth(), 1));
        }
    }
}

export function MiniCalendar({currentDate, selectedWeek, setSelectedWeek}: MiniCalendarProps) {
    const [miniCalendarSelectedMonth, setMiniCalendarSelectedMonth] = useState(
        () => new Date(selectedWeek.getFullYear(), selectedWeek.getMonth(), 1)
    );

    const [prevWeek, setPrevWeek] = useState(selectedWeek);
    changeSelectedMonthOnSelectedWeekChange(
        selectedWeek,
        prevWeek,
        setPrevWeek,
        miniCalendarSelectedMonth,
        setMiniCalendarSelectedMonth
    );

    const days = getMonthCalendarGrid(miniCalendarSelectedMonth);
    const monthLabel = getMonthAndYearLabel(miniCalendarSelectedMonth);

    function goToPrevMonth() {
        setMiniCalendarSelectedMonth((prev) => getPrevMonth(prev));
    }

    function goToNextMonth() {
        setMiniCalendarSelectedMonth((prev) => getNextMonth(prev));
    }

    function handleDateClick(date: Date) {
        const monday = getPreviousMonday(date);
        setSelectedWeek(monday);
    }

    return (
        <>
            <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold">{monthLabel}</span>
                <div className="flex items-center gap-1">
                    <button
                        onClick={goToPrevMonth}
                        className="rounded p-0.5 hover:bg-gray-200 transition-colors"
                        aria-label="Previous month"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                             className="size-4">
                            <path fillRule="evenodd"
                                  d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                                  clipRule="evenodd"/>
                        </svg>
                    </button>
                    <button
                        onClick={goToNextMonth}
                        className="rounded p-0.5 hover:bg-gray-200 transition-colors"
                        aria-label="Next month"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                             className="size-4">
                            <path fillRule="evenodd"
                                  d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                  clipRule="evenodd"/>
                        </svg>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 text-center text-xs text-gray-400 mb-1">
                {WEEKDAY_LABELS.map((label) => (
                    <span key={label} className="py-0.5">{label}</span>
                ))}
            </div>

            <div className="grid grid-cols-7 text-center text-sm">
                {days.map((date) => {
                    const isCurrentMonth = date.getMonth() === miniCalendarSelectedMonth.getMonth();
                    const isToday = isSameDay(date, currentDate);
                    const isSelectedMonday = isSameDay(date, selectedWeek);

                    return (
                        <button
                            key={date.toISOString()}
                            onClick={() => handleDateClick(date)}
                            className={[
                                "py-1 rounded transition-colors",
                                !isCurrentMonth && "text-gray-300",
                                isCurrentMonth && !isSelectedMonday && !isToday && "text-gray-700 hover:bg-gray-100",
                                isSelectedMonday && !isToday && "bg-blue-100 text-blue-700 font-semibold",
                                isToday && "bg-blue-600 text-white font-semibold",
                            ].filter(Boolean).join(" ")}
                        >
                            {date.getDate()}
                        </button>
                    );
                })}
            </div>
        </>
    );
}
