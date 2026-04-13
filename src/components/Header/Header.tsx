import {getWeekNumber, getPrevWeekStart, getNextWeekStart, getUtcOffsetLabel} from "@/date.ts";

interface HeaderProps {
    currentDate: Date;
    selectedWeek: Date;
    setSelectedWeek: (newWeek: Date) => void;
}


export function Header({currentDate, selectedWeek, setSelectedWeek}: HeaderProps) {
    const weekNumber = getWeekNumber(selectedWeek);

    return (
        <header className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">
                    {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
                </span>
                <span className="text-sm text-gray-500">{getUtcOffsetLabel(currentDate)}</span>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={() => setSelectedWeek(getPrevWeekStart(selectedWeek))}
                    className="rounded p-1 hover:bg-gray-200 transition-colors"
                    aria-label="Previous week"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path fillRule="evenodd"
                              d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                              clipRule="evenodd"/>
                    </svg>
                </button>

                <span className="text-lg font-medium">Week {weekNumber}</span>

                <button
                    onClick={() => setSelectedWeek(getNextWeekStart(selectedWeek))}
                    className="rounded p-1 hover:bg-gray-200 transition-colors"
                    aria-label="Next week"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path fillRule="evenodd"
                              d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                              clipRule="evenodd"/>
                    </svg>
                </button>
            </div>
        </header>
    );
}
