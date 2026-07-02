import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Paper,
  Button,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { UpdateTicket } from "../components/updateTicket";
import type { eStatus, ePriority } from "../types";

export const TicketCard = ({
  id = "",
  title = "",
  name = "",
  status = "Open",
  priority = "High",
  created = new Date(),
}: {
  id: string;
  title: string;
  name: string;
  status: eStatus;
  priority: ePriority;
  created: Date;
}) => {
  const [updateOpen, setUpdateOpen] = useState(false);

  const handleOpenUpdate = () => {
    setUpdateOpen(true);
  };
  const handleCloseUpdate = () => {
    setUpdateOpen(false);
  };

  return (
    <>
      <UpdateTicket
        updateOpen={updateOpen}
        onClose={handleCloseUpdate}
        ticketId={id}
      />
      <Paper elevation={8} className="max-w-60">
        <Card>
          <CardHeader title={title} />
          <CardContent>
            <Typography className="py-1">{name}</Typography>
            <Typography>Created on</Typography>
            <Divider />
            <Typography className="py-1">
              {new Date(created).toLocaleString()}
            </Typography>
            <Grid container spacing={3} className="py-1">
              <Grid>
                <Typography>Status</Typography>
                <Divider />
                <Typography>{status}</Typography>
              </Grid>
              <Grid>
                <Typography>Priority</Typography>
                <Divider />
                <Typography>{priority}</Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions className="justify-end">
            <Grid container>
              <Grid>
                <Button endIcon={<EditIcon />} onClick={handleOpenUpdate}>
                  View / Update
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Paper>
    </>
  );
};
