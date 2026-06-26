const HOURS = Array.from({ length: 24 }, (_, i) => i);

export function HoursScale() {
    return (
        <div className="flex flex-col shrink-0 w-14 border-r border-gray-200">
            <div className="sticky top-0 z-10 border-b border-gray-200 bg-white h-16 shrink-0" />
            <div>
                {HOURS.map((hour) => (
                    <div
                        key={hour}
                        className="h-12 relative"
                    >
                        {hour > 0 && (
                            <span className="absolute -top-2 right-2 text-xs text-gray-400">
                                {`${hour}:00`}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}