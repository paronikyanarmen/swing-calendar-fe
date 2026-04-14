import dayjs from "dayjs";

export function isSameDay(a: Date, b: Date): boolean {
    return dayjs(a).format('YYYY-MM-DD') === dayjs(b).format('YYYY-MM-DD');
}
