import {
  useState,
  useEffect,
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
import type { eStatus } from "../types";
import { statusList } from "../constants";
import { updateTicket } from "../services/ticketServices";
import { AlertContext } from "../contexts";

export const UpdateTicket = ({
  updateOpen = false,
  onClose,
  ticketId,
}: {
  updateOpen: boolean;
  onClose: () => void;
  ticketId: string;
}) => {
  const initialValid = {
    localStatus: true,
  };
  const [localStatus, setLocalStatus] = useState("");
  const [isValid, setIsValid] = useState(initialValid);
  // @ts-ignore
  const { alertProps, setAlertProps, fetchTickets } = useContext(AlertContext);

  const handleInput = (e: BaseSyntheticEvent | SelectChangeEvent) => {
    const { name, value } = e.target;
    setLocalStatus(value);
  };
  const handleValidation = (e: BaseSyntheticEvent | SelectChangeEvent) => {
    const { name, value, type } = e.target;
    if (!value) {
      setIsValid((prevData) => ({ ...prevData, [name]: false }));
      return;
    }
    let result = null;
    switch (type) {
      case "select":
        if (!isValid.localStatus && value) {
          setIsValid((prevData) => ({ ...prevData, [name]: true }));
        }
        return;
    }
    if (result && result === isValid[name as keyof typeof isValid]) {
      return;
    }
    if (result) {
      setIsValid((prevData) => ({ ...prevData, [name]: true }));
    } else {
      setIsValid((prevData) => ({ ...prevData, [name]: false }));
    }
  };
  const handleInitialize = () => {
    setIsValid(initialValid);
    onClose();
  };
  const handleSubmit = async () => {
    try {
      const result = await updateTicket(localStatus as eStatus);
      console.log("Success", result);
      // @ts-ignore
      setAlertProps((prevData) => ({
        ...prevData,
        ...{
          type: "success",
          isOpen: true,
          message: "Ticket successfully added!",
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
          message: "Please check the form fields you entered and try again.",
        },
      }));
    }
  };

  return (
    <Modal open={updateOpen} /* onClose={onClose} */ className="relative">
      <Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100">
        <CardContent>
          <Grid container spacing={3}>
            <Grid size={12}>
              <Typography>Title</Typography>
            </Grid>
            <Grid size={12}>
              <Typography>Description</Typography>
            </Grid>
            <Grid size={6}>
              <Typography>Name</Typography>
            </Grid>
            <Grid size={6}>
              <Typography>Email</Typography>
            </Grid>
            {/* <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select value={status} label="Status">
              {statusList.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
                ))}
                </Select>
                </FormControl> */}
            <FormControl fullWidth required error={!isValid.localStatus}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={localStatus}
                label="status"
                name="priority"
                onChange={handleInput}
                onClose={(e) => {
                  const { innerText } = e.target as HTMLElement;
                  const next = {
                    ...e,
                    target: {
                      ...e.target,
                      name: "priority",
                      value: innerText,
                      type: "select",
                    },
                  };
                  return handleValidation(next);
                }}
              >
                {statusList.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
              {!isValid.localStatus && (
                <FormHelperText>Please make a selection</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </CardContent>
        <CardActions className="justify-end">
          <Button
            color="primary"
            variant="contained"
            disabled={!localStatus}
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
