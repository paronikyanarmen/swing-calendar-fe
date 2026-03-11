import {useState} from "react";
import {Header} from "./components/Header/Header";
import {Week} from "./components/Week/Week";
import { getPreviousMonday } from "./date";


function App() {
    const currentDate = new Date();
    const [selectedWeek, setSelectedWeek] = useState(() => getPreviousMonday(currentDate));

    return (
        <div className="flex flex-col h-screen">
            <Header
                currentDate={currentDate}
                selectedWeek={selectedWeek}
                setSelectedWeek={setSelectedWeek}
            />
            <Week currentDate={currentDate} selectedWeek={selectedWeek} />
        </div>
    );
}

export default App;
