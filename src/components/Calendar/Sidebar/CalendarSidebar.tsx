import { MiniCalendar } from "@/components/Calendar/Sidebar/MiniCalendar";

interface CalendarSidebarProps {
    currentDate: Date;
    selectedWeek: Date;
    setSelectedWeek: (week: Date) => void;
}

export function CalendarSidebar({ currentDate, selectedWeek, setSelectedWeek }: CalendarSidebarProps) {
    return (
        <aside className="w-64 shrink-0 border-r border-gray-200 px-4 pt-56">
            <MiniCalendar
                currentDate={currentDate}
                selectedWeek={selectedWeek}
                setSelectedWeek={setSelectedWeek}
            />
        </aside>
    );
}
