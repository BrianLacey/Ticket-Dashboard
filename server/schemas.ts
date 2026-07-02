import { object, string, mixed, date } from "yup";
import { eStatus, ePriority } from "./models.ts";

export const ticketSchema = object({
  title: string().strict().required(),
  description: string().strict().required(),
  name: string().strict().required(),
  email: string().strict().email().required(),
  status: mixed().oneOf(Object.values(eStatus)).required(),
  priority: mixed().oneOf(Object.values(ePriority)).required(),
  created: date().required(),
});
