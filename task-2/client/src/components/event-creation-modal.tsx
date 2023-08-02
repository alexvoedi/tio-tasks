import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import { Event } from "../interfaces/Event";

export function EventCreationModal({
  addEvent,
}: {
  addEvent: (event: Event) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");

  const submit = async () => {
    const url = new URL("events", import.meta.env.VITE_BACKEND_URL);

    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, city, date }),
    });

    const json = await result.json();

    addEvent(json);

    handleClose();
  };

  return (
    <>
      <Button onClick={handleOpen}>Create Event</Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Event</DialogTitle>

        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "20rem",
          }}
        >
          <FormControl>
            <InputLabel htmlFor="title">Title</InputLabel>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="city">City</InputLabel>
            <Input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="date">Date</InputLabel>
            <Input
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
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
