import {useState} from "react";
import {Header} from "./components/Header/Header";
import {Week} from "./components/Week/Week";
import {Sidebar} from "./components/Sidebar/Sidebar";
import {getPreviousMonday} from "@/dateService/math.ts";


function App() {
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

export default App;
