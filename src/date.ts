import dayjs from 'dayjs';

export function getPreviousMonday(date: Date): Date {
    const copy = dayjs(date);
    const day = copy.day();
    const to_subtract = (7 + (day - 1)) % 7;

    return copy.subtract(to_subtract, 'day').toDate();
}

export function getWeekNumber(date: Date): number {
    const start = new Date(date.getFullYear(), 0, 1);
    const diff = date.getTime() - start.getTime();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    return Math.ceil((diff / oneWeek + start.getDay() + 1) / 7);
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