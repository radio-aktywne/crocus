import { dayjs } from "../../../../../common/dates/vars/dayjs";

export const constants = {
  sessionAge: dayjs.duration(30, "days"),
} as const;
