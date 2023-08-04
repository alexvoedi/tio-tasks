import { useState } from "react";
import { Ticket } from "../interfaces/Ticket";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  Input,
  InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export function TicketEditingModal({
  ticket,
  updateTicket,
}: {
  updateTicket: (ticket: Ticket) => void;
  ticket: Ticket;
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [barcode, setBarcode] = useState(ticket.barcode);
  const [nameFirst, setNameFirst] = useState(ticket.name.first);
  const [nameLast, setNameLast] = useState(ticket.name.last);
  const [errors, setErrors] = useState<string | null>(null);

  const submit = async () => {
    setErrors(null);

    const url = new URL(
      `tickets/${ticket.id}`,
      import.meta.env.VITE_BACKEND_URL
    );

    try {
      const result = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          barcode,
          name: {
            first: nameFirst,
            last: nameLast,
          },
        }),
      });

      const json = await result.json();

      if (!result.ok) {
        throw new Error(json.message);
      }

      updateTicket(json);
      handleClose();
    } catch (error) {
      if (error instanceof Error) {
        setErrors(error.message);
      }
    }
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <EditIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Event</DialogTitle>

        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "36rem",
          }}
        >
          {errors && <Alert severity="error">{errors}</Alert>}

          <FormControl>
            <InputLabel htmlFor="barcode">Barcode</InputLabel>
            <Input
              id="barcode"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="nameFirst">First Name</InputLabel>
            <Input
              id="nameFirst"
              value={nameFirst}
              onChange={(e) => setNameFirst(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="nameLast">Last Name</InputLabel>
            <Input
              id="nameLast"
              value={nameLast}
              onChange={(e) => setNameLast(e.target.value)}
            />
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
