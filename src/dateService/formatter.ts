import dayjs from "dayjs";

import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);

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

export function getWeekNumber(date: Date): number {
    const copy = dayjs(date);
    return copy.week();
}

export function getCurrentMinutes(): number {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
}

export function getMonthAndYearLabel(date: Date): string {
    return dayjs(date).format("MMMM YYYY");
}

export function getWeekMonthLabel(weekStart: Date): string {
    const start = dayjs(weekStart);
    const end = start.add(6, "day");

    if (start.isSame(end, "month")) {
        return start.format("MMMM YYYY");
    }
    if (start.isSame(end, "year")) {
        return `${start.format("MMMM")} – ${end.format("MMMM YYYY")}`;
    }
    return `${start.format("MMMM YYYY")} – ${end.format("MMMM YYYY")}`;
}