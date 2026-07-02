export type eStatus = "Open" | "In Progress" | "Resolved";

export type ePriority = "Low" | "Medium" | "High";

export interface ITicket {
  id: string;
  title: string;
  description: string;
  name: string;
  email: string;
  status: eStatus;
  priority: ePriority;
  created: Date;
}

export type TAlertProps = {
  type: "success" | "error";
  isOpen: boolean;
  message: string;
};

export interface IAlertContext {
  alertProps: TAlertProps;
  setAlertProps: React.Dispatch<React.SetStateAction<TAlertProps>>;
  fetchTickets: () => Promise<void>;
}
