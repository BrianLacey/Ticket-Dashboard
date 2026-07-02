import { useState, useEffect } from "react";
import {
  Container,
  Button,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Grid,
  Stack,
  CircularProgress,
} from "@mui/material";
import { PageContent } from "./containers/PageContent";
import { CreateTicket } from "./components/createTicket";
import { readTickets } from "./services/ticketServices";
import { PopAlert } from "./components/popAlert";
import { AlertContext, TicketDataContext } from "./contexts";
import type { ITicket, TAlertProps } from "./types";

const App = () => {
  const initialAlert: TAlertProps = {
    type: "success",
    isOpen: false,
    message: "",
  };
  const [ticketList, setTicketList] = useState<ITicket[]>([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [alertProps, setAlertProps] = useState(initialAlert);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    try {
      const tickets = await readTickets();
      setTicketList(tickets);
      console.log(tickets.length);
      setLoading(false);
    } catch (err) {
      console.error("Error", err);
      // @ts-ignore
      setAlertProps((prevData) => ({
        ...prevData,
        ...{
          type: "error",
          isOpen: true,
          message:
            "There was a problem loading tickets. Please try again later.",
        },
      }));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleOpenCreate = () => {
    setCreateOpen(true);
  };
  const handleClose = () => {
    setCreateOpen(false);
  };

  return (
    <>
      <TicketDataContext value={{ ticketList, fetchTickets }}>
        <AlertContext value={{ alertProps, setAlertProps }}>
          <CreateTicket createOpen={createOpen} onClose={handleClose} />
          {loading ? (
            <CircularProgress
              size={80}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          ) : (
            <Container className="min-h-screen min-w-screen bg-blue-100">
              <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar className="justify-center">
                  <Typography>Ticket Dashboard</Typography>
                </Toolbar>
              </AppBar>
              <Drawer
                variant="permanent"
                anchor="left"
                slotProps={{
                  paper: { sx: { backgroundColor: "#475569", width: 150 } },
                }}
              >
                <Toolbar />
                <Button
                  className="text-white! pt-4!"
                  onClick={handleOpenCreate}
                >
                  Create
                </Button>
              </Drawer>
              <Stack className="min-h-screen pl-38 py-6">
                <PageContent ticketList={ticketList} />
              </Stack>
              <Stack className="fixed bottom-0 left-4 right-4 z-10000">
                <PopAlert />
              </Stack>
            </Container>
          )}
        </AlertContext>
      </TicketDataContext>
    </>
  );
};

export default App;
