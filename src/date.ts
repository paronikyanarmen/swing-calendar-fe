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

export function getNextWeekStart(date: Date): Date {
    const prev_monday = getPreviousMonday(date);
    const next_monday = dayjs(prev_monday).add(7, 'day');
    return next_monday.toDate();
}

export function getPrevWeekStart(date: Date): Date {
    const prev_monday = getPreviousMonday(date);
    const prev_prev_monday = dayjs(prev_monday).subtract(7, 'day');
    return prev_prev_monday.toDate();
}

export function getUtcOffsetLabel(date: Date): string {
    const offsetMin = dayjs(date).utcOffset();
    const sign = offsetMin >= 0 ? "+" : "-";
    const unsignedOffset = Math.abs(offsetMin);
    const hours = Math.floor(unsignedOffset / 60).toString();
    const minutes = unsignedOffset % 60;

    const hours_for_display = hours.padStart(2, "0");

    const result = `UTC${sign}${hours_for_display}`;

    if (!minutes) {
        return result;
    }

    const minutes_for_display = minutes.toString().padStart(2, "0");

    return `${result}:${minutes_for_display}`;
}
