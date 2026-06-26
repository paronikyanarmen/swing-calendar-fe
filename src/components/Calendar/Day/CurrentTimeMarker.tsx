import {useEffect, useRef, useState} from "react";
import {getCurrentMinutes} from "@/dateService/formatter.ts";


export function CurrentTimeMarker() {
    const [totalMinutes, setTotalMinutes] = useState(getCurrentMinutes);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const id = setInterval(() => setTotalMinutes(getCurrentMinutes()), 60_000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        lineRef.current?.scrollIntoView({block: "center"});
    }, []);

    const topPx = totalMinutes / 60 * 48;

    return (
        <div
            ref={lineRef}
            className="absolute left-0 right-0 z-20 flex items-center pointer-events-none"
            style={{top: `${topPx}px`, transform: "translateY(-50%)"}}
        >
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 -ml-1 shrink-0"/>
            <div className="flex-1 h-0.5 bg-red-500"/>
        </div>
    );
}