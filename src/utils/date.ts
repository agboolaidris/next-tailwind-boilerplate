import dayjs from "dayjs";

export function generateTodayDate(format?: string): string {
  const today: dayjs.Dayjs = dayjs();
  const formattedDate: string = today.format(format || "DD MMM, YYYY");
  return formattedDate;
}

export function formatDate(date?: string, format = "DD MMM, YYYY"): string {
  const value: dayjs.Dayjs = dayjs(date);
  const formattedDate: string = value.format(format);
  return formattedDate;
}
