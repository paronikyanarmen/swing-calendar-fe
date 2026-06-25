import {useState} from "react";
import {Header} from "./Header/Header.tsx";
import {Week} from "./Week/Week.tsx";
import {Sidebar} from "./Sidebar/Sidebar.tsx";
import {getPreviousMonday} from "@/dateService/math.ts";


function Calendar() {
    const currentDate = new Date();
    const [selectedWeek, setSelectedWeek] = useState(() => getPreviousMonday(currentDate));

    return (
        <div className="flex h-screen">
            <Sidebar
                currentDate={currentDate}
                selectedWeek={selectedWeek}
                setSelectedWeek={setSelectedWeek}
            />
            <div className="flex flex-col flex-1 min-w-0">
                <Header
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
