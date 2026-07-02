import {
  useState,
  useEffect,
  useMemo,
  useContext,
  type BaseSyntheticEvent,
} from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Modal,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import type { eStatus, ITicket } from "../types";
import { statusList } from "../constants";
import { updateTicket } from "../services/ticketServices";
import { AlertContext, TicketDataContext } from "../contexts";

export const UpdateTicket = ({
  updateOpen = false,
  onClose,
  ticketId,
}: {
  updateOpen: boolean;
  onClose: () => void;
  ticketId: string;
}) => {
  const [localStatus, setLocalStatus] = useState("");
  const [isValid, setIsValid] = useState(true);
  // @ts-ignore
  const { alertProps, setAlertProps } = useContext(AlertContext);
  // @ts-ignore
  const { ticketList, fetchTickets } = useContext(TicketDataContext);
  const currentTicket: ITicket = useMemo(() => {
    if (updateOpen) {
      return ticketList.find((ticket: ITicket) => ticket.id === ticketId);
    } else {
      return {
        title: "",
        description: "",
        name: "",
        email: "",
        status: "",
        priority: "",
      };
    }
  }, [updateOpen]);

  useEffect(() => {
    if (currentTicket) {
      setLocalStatus(currentTicket.status);
    }
  }, [currentTicket]);
  useEffect(() => {
    handleValidation(localStatus as eStatus);
  }, [localStatus]);

  const handleInput = (e: SelectChangeEvent) => {
    const { value } = e.target;
    if (!value) return;
    setLocalStatus(value);
  };
  const handleValidation = (nextStatus: eStatus) => {
    if (!nextStatus) {
      setIsValid(false);
      return;
    }
    if (!isValid && nextStatus) {
      setIsValid(true);
    }
  };
  const handleInitialize = () => {
    setLocalStatus("");
    setIsValid(true);
    onClose();
  };
  const handleSubmit = async () => {
    try {
      const result = await updateTicket({
        ticketId,
        localStatus: localStatus as eStatus,
      });
      console.log("Success", result);
      // @ts-ignore
      setAlertProps((prevData) => ({
        ...prevData,
        ...{
          type: "success",
          isOpen: true,
          message: "Ticket successfully updated!",
        },
      }));
      fetchTickets();
      handleInitialize();
    } catch (err) {
      console.error("Error", err);
      // @ts-ignore
      setAlertProps((prevData) => ({
        ...prevData,
        ...{
          type: "error",
          isOpen: true,
          message: "Please check the selection and try again.",
        },
      }));
    }
  };

  return (
    <Modal open={updateOpen} className="relative">
      <Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150">
        <CardContent>
          <Grid container spacing={3}>
            <Grid size={12}>
              <Typography>Title:</Typography>
              <Typography>{currentTicket.title}</Typography>
              <Divider className="py-0.5" />
            </Grid>
            <Grid size={12}>
              <Typography>Description:</Typography>
              <Typography>{currentTicket.description}</Typography>
              <Divider className="py-0.5" />
            </Grid>
            <Grid size={6}>
              <Typography>Name:</Typography>
              <Typography>{currentTicket.name}</Typography>
              <Divider className="py-0.5" />
            </Grid>
            <Grid size={6}>
              <Typography>Email:</Typography>
              <Typography>{currentTicket.email}</Typography>
              <Divider className="py-0.5" />
            </Grid>
            <Grid size={6}>
              <Typography>Created:</Typography>
              <Typography>
                {new Date(currentTicket.created).toLocaleString()}
              </Typography>
              <Divider className="py-0.5" />
            </Grid>
            <Grid size={6}>
              <Typography>Priority:</Typography>
              <Typography>{currentTicket.priority}</Typography>
              <Divider className="py-0.5" />
            </Grid>
            <FormControl fullWidth required error={!isValid}>
              <InputLabel>Status</InputLabel>
              <Select
                value={localStatus}
                label="status"
                name="status"
                onChange={handleInput}
              >
                {statusList.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
              {!isValid && (
                <FormHelperText>Please make a selection</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </CardContent>
        <CardActions className="justify-end">
          <Button
            color="primary"
            variant="contained"
            disabled={!isValid || localStatus === currentTicket.status}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button onClick={handleInitialize}>Cancel</Button>
        </CardActions>
      </Card>
    </Modal>
  );
};
