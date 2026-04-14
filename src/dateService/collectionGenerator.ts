import dayjs from "dayjs";

export function getWeekDays(monday: Date): Date[] {
    const start = dayjs(monday);
    return Array.from({length: 7}, (_, i) => start.add(i, 'day').toDate());
}

export function getMonthCalendarGrid(date: Date): Date[] {
    const firstOfMonth = dayjs(date).startOf('month');
    const startDay = firstOfMonth.day();
    const mondayOffset = (startDay + 6) % 7;
    const gridStart = firstOfMonth.subtract(mondayOffset, 'day');

    const lastOfMonth = firstOfMonth.endOf('month');
    const endDay = lastOfMonth.day();
    const sundayOffset = endDay === 0 ? 0 : 7 - endDay;
    const gridEnd = lastOfMonth.add(sundayOffset, 'day');

    const days: Date[] = [];
    let current = gridStart;
    while (current.isBefore(gridEnd) || current.isSame(gridEnd, 'day')) {
        days.push(current.toDate());
        current = current.add(1, 'day');
    }
    return days;
}
