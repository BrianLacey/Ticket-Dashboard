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

export const updateTicket = async (updatedStatus: eStatus) => {
  const response = await fetch("http://localhost:3001/api/tickets", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedStatus),
  });
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
