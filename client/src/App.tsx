import { useState, useEffect, type BaseSyntheticEvent } from "react";
import {
  Container,
  Button,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Stack,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListSubheader,
  type SelectChangeEvent,
} from "@mui/material";
import { PageContent } from "./containers/PageContent";
import { CreateTicket } from "./components/createTicket";
import { readTickets } from "./services/ticketServices";
import { PopAlert } from "./components/popAlert";
import { AlertContext, TicketDataContext } from "./contexts";
import type { ITicket, TAlertProps, eStatus, ePriority } from "./types";

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
  const [filter, setFilter] = useState<eStatus | ePriority | "">("");

  const fetchTickets = async () => {
    try {
      const tickets = await readTickets();
      setTicketList(tickets);
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
  const handleFilter = (e: SelectChangeEvent) => {
    const value = e.target.value as eStatus | ePriority | "";
    setFilter(value);
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
                <FormControl
                  fullWidth
                  className="px-2! mt-2! [&_.MuiInputLabel-root]:text-white!   [&_.MuiOutlinedInput-root]:text-white! [&_.MuiOutlinedInput-notchedOutline]:border-white! [&_.MuiSelect-icon]:text-white!"
                >
                  <InputLabel className="pl-2.5!">Filter</InputLabel>
                  <Select
                    value={filter}
                    label="filter"
                    name="filter"
                    onChange={handleFilter}
                    className="px-2!"
                  >
                    <ListSubheader>Status</ListSubheader>
                    <MenuItem value="Open">Open</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Resolved">Resolved</MenuItem>
                    <ListSubheader>Priority</ListSubheader>
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  className="text-white! pt-4!"
                  onClick={(e) => {
                    type ExpectedFilterEvent =
                      React.ChangeEvent<HTMLInputElement> & {
                        target: { value: string; name: string };
                      };
                    handleFilter({
                      ...e,
                      target: {
                        ...e.target,
                        value: "",
                        name:
                          (e.target as HTMLElement).getAttribute("name") || "",
                      },
                    } as unknown as ExpectedFilterEvent);
                  }}
                >
                  Clear Filter
                </Button>
              </Drawer>
              <Stack className="min-h-screen pl-38 py-6">
                <PageContent ticketList={ticketList} filter={filter} />
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
