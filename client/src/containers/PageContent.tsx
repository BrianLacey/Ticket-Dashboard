import {
  Toolbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import { TicketCard } from "../components/ticketCard";
import { statusList } from "../constants";
import type { ITicket } from "../types";

export const PageContent = ({ ticketList }: { ticketList: ITicket[] }) => {
  return (
    <>
      <Toolbar />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {statusList.map((status) => (
                <TableCell align="center" key={status}>
                  {status}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {statusList.map((status) => {
                const matchingTickets = ticketList.filter(
                  (ticket) => ticket.status === status,
                );

                return (
                  <TableCell key={status} className="align-top!">
                    {matchingTickets.map((ticket) => (
                      <Box key={ticket.id} className="pb-4 flex justify-center">
                        <TicketCard
                          id={ticket.id}
                          title={ticket.title}
                          name={ticket.name}
                          status={ticket.status}
                          priority={ticket.priority}
                          created={ticket.created}
                        />
                      </Box>
                    ))}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
