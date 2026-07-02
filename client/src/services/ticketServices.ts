import type { ITicket, eStatus } from "../types";

export const createTickets = async (ticket: ITicket) => {
  const response = await fetch("http://localhost:3001/api/tickets", {
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
    `http://localhost:3001/api/tickets/${ticketId}`,
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
  const response = await fetch("http://localhost:3001/api/tickets", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw await response.json();
  } else {
    return response.json();
  }
};
