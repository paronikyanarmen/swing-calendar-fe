import {useState} from "react";
import {Header} from "./components/Header/Header";
import { getPreviousMonday } from "./date";


function App() {
    const currentDate = new Date();
    console.log(getPreviousMonday(currentDate));
    const [selectedWeek, setSelectedWeek] = useState(() => getPreviousMonday(currentDate));

    return (
        <Header
            currentDate={currentDate}
            selectedWeek={selectedWeek}
            setSelectedWeek={setSelectedWeek}
        />
    );
}

export default App;
