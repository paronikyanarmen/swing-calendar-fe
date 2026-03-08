export function getPreviousMonday(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    d.setDate(d.getDate() + diff);
    return d;
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