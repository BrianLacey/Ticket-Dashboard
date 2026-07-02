import { createContext } from "react";
import type { IAlertContext } from "./types";

export const AlertContext = createContext<IAlertContext | null>(null);
