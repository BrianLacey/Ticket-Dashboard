import { createContext } from "react";
import type { IAlertContext, ITicketDataContext } from "./types";

export const AlertContext = createContext<IAlertContext | null>(null);

export const TicketDataContext = createContext<ITicketDataContext | null>(null);
