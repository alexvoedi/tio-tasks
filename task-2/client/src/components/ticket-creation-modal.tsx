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
import AddIcon from "@mui/icons-material/Add";
import { Event } from "../interfaces/Event";

export function TicketCreationModal({
  event,
  addTicket,
}: {
  event: Event;
  addTicket: (ticket: Ticket) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [barcode, setBarcode] = useState<string>("");
  const [nameFirst, setNameFirst] = useState<string>("");
  const [nameLast, setNameLast] = useState<string>("");

  const [errors, setErrors] = useState<string | null>(null);

  const submit = async () => {
    setErrors(null);

    const url = new URL(`events/${event.id}/tickets`, import.meta.env.VITE_BACKEND_URL);

    try {
      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: event.id,
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

      setBarcode("");
      setNameFirst("");
      setNameLast("");

      addTicket(json);
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
        <AddIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Ticket</DialogTitle>

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
            ></Input>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="firstName">First Name</InputLabel>
            <Input
              id="firstName"
              value={nameFirst}
              onChange={(e) => setNameFirst(e.target.value)}
            ></Input>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="lastName">Last Name</InputLabel>
            <Input
              id="lastName"
              value={nameLast}
              onChange={(e) => setNameLast(e.target.value)}
            ></Input>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submit}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
