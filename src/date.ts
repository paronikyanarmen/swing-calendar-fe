import dayjs from 'dayjs';

import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);

export function getPreviousMonday(date: Date): Date {
    const copy = dayjs(date);
    const day = copy.day();
    const to_subtract = (7 + (day - 1)) % 7;

    return copy.subtract(to_subtract, 'day').toDate();
}

export function getWeekNumber(date: Date): number {
    const copy = dayjs(date);
    return copy.week();
}

export function getNextWeekStart(monday: Date): Date {
    const next = new Date(monday);
    next.setDate(next.getDate() + 7);
    return next;
}

export function getPrevWeekStart(monday: Date): Date {
    const next = new Date(monday);
    next.setDate(next.getDate() - 7);
    return next;
}