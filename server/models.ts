export const eStatus = {
  open: "Open",
  inProgress: "In Progress",
  resolved: "Resolved",
} as const;
export const ePriority = {
  low: "Low",
  medium: "Medium",
  high: "High",
} as const;

export interface ITicket {
  title: string;
  description: string;
  name: string;
  email: string;
  status: typeof eStatus;
  priority: typeof ePriority;
  created: Date;
}

export interface IError extends Error {
  status?: number;
}
