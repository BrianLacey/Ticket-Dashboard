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
  TextField,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import type { ITicket } from "../types";
import { priorityList, textRegex, emailRegex } from "../constants";
import { createTickets } from "../services/ticketServices";
import { AlertContext } from "../contexts";

export const CreateTicket = ({
  createOpen = false,
  onClose,
}: {
  createOpen: boolean;
  onClose: () => void;
}) => {
  const initialTicket = {
    title: "",
    description: "",
    name: "",
    email: "",
    priority: "",
  };
  const initialValid = {
    title: true,
    description: true,
    name: true,
    email: true,
    priority: true,
  };
  const [ticketData, setTicketData] = useState(initialTicket);
  const [isValid, setIsValid] = useState(initialValid);
  // @ts-ignore
  const { alertProps, setAlertProps, fetchTickets } = useContext(AlertContext);

  useEffect(() => {
    if (createOpen) {
      const e = {
        target: {
          name: "priority",
          value: ticketData.priority,
          type: "select",
        },
      };
      handleValidation(e as BaseSyntheticEvent);
    }
  }, [ticketData.priority]);

  const handleInput = (e: BaseSyntheticEvent | SelectChangeEvent) => {
    const { name, value } = e.target;
    setTicketData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleValidation = (e: BaseSyntheticEvent | SelectChangeEvent) => {
    const { name, value, type } = e.target;
    if (!value) {
      setIsValid((prevData) => ({ ...prevData, [name]: false }));
      return;
    }
    let result = null;
    switch (type) {
      case "text":
      case "textarea":
        result = textRegex.test(value);
        break;
      case "email":
        result = emailRegex.test(value);
        break;
      case "select":
        if (!isValid.priority && value) {
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
    setTicketData(initialTicket);
    setIsValid(initialValid);
    onClose();
  };
  const handleSubmit = async () => {
    const data = {
      ...ticketData,
      status: "Open",
      created: new Date(),
    } as ITicket;
    try {
      const result = await createTickets(data);
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
    <Modal open={createOpen} className="relative">
      <Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100">
        <CardContent>
          <Grid container spacing={3}>
            <Grid size={12}>
              <TextField
                fullWidth
                label="title"
                name="title"
                value={ticketData.title}
                onChange={handleInput}
                onBlur={handleValidation}
                type="text"
                required
                error={!isValid.title}
                helperText={
                  !isValid.title && "Please use alphanumeric characters only"
                }
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                multiline
                label="description"
                name="description"
                value={ticketData.description}
                onChange={handleInput}
                onBlur={handleValidation}
                type="text"
                required
                error={!isValid.description}
                helperText={
                  !isValid.description &&
                  "Please use alphanumeric characters only"
                }
              />
            </Grid>
            <Grid size={6}>
              <TextField
                fullWidth
                label="name"
                name="name"
                value={ticketData.name}
                onChange={handleInput}
                onBlur={handleValidation}
                type="text"
                required
                error={!isValid.name}
                helperText={
                  !isValid.name && "Please use alphanumeric characters only"
                }
              />
            </Grid>
            <Grid size={6}>
              <TextField
                fullWidth
                label="email"
                name="email"
                value={ticketData.email}
                onChange={handleInput}
                onBlur={handleValidation}
                type="email"
                required
                error={!isValid.email}
                helperText={!isValid.email && "Please use valid emails only"}
              />
            </Grid>
            <FormControl fullWidth required error={!isValid.priority}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={ticketData.priority}
                label="priority"
                name="priority"
                onChange={handleInput}
              >
                {priorityList.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
              {!isValid.priority && (
                <FormHelperText>Please make a selection</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </CardContent>
        <CardActions className="justify-end">
          <Button
            color="primary"
            variant="contained"
            disabled={
              Object.keys(isValid).some(
                (item) => isValid[item as keyof typeof isValid] === false,
              ) ||
              Object.keys(ticketData).some(
                (item) => !ticketData[item as keyof typeof ticketData],
              )
            }
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
