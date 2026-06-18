import { MiniCalendar } from "@/components/Sidebar/MiniCalendar";

interface SidebarProps {
    currentDate: Date;
    selectedWeek: Date;
    setSelectedWeek: (week: Date) => void;
}

export function Sidebar({ currentDate, selectedWeek, setSelectedWeek }: SidebarProps) {
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
