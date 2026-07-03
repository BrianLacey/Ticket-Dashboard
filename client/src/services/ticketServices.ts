import type { ITicket, eStatus } from "../types";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createTickets = async (ticket: ITicket) => {
  const response = await fetch(`${BASE_URL}/api/tickets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ticket),
  });
  if (!response.ok) {
    throw await response.json();
  } else {
    return response.json();
  }
};

export const updateTicket = async (updateData: {
  ticketId: string;
  localStatus: eStatus;
}) => {
  const { ticketId, localStatus } = updateData;
  const response = await fetch(
    `${BASE_URL}/api/tickets/${ticketId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: localStatus }),
    },
  );
  if (!response.ok) {
    throw await response.json();
  } else {
    return response.json();
  }
};

export const readTickets = async () => {
  const response = await fetch(`${BASE_URL}/api/tickets`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw await response.json();
  } else {
    return response.json();
  }
};
