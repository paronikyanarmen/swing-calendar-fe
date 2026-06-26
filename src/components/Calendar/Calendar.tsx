import {useState} from "react";
import {CalendarHeader} from "./Header/CalendarHeader.tsx";
import {Week} from "./Week/Week.tsx";
import {CalendarSidebar} from "./Sidebar/CalendarSidebar.tsx";
import {getPreviousMonday} from "@/dateService/math.ts";


function Calendar() {
    const currentDate = new Date();
    const [selectedWeek, setSelectedWeek] = useState(() => getPreviousMonday(currentDate));

    return (
        <div className="flex h-screen">
            <CalendarSidebar
                currentDate={currentDate}
                selectedWeek={selectedWeek}
                setSelectedWeek={setSelectedWeek}
            />
            <div className="flex flex-col flex-1 min-w-0">
                <CalendarHeader
                    currentDate={currentDate}
                    selectedWeek={selectedWeek}
                    setSelectedWeek={setSelectedWeek}
                />
                <Week currentDate={currentDate} selectedWeek={selectedWeek} />
            </div>
        </div>
    );
}

export default Calendar;
