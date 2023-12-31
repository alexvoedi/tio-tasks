import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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

  const [title, setTitle] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [date, setDate] = useState<string | null>(null);
  const [errors, setErrors] = useState<string | null>(null);

  const submit = async () => {
    setErrors(null);

    const url = new URL("events", import.meta.env.VITE_BACKEND_URL);

    try {
      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, city, date, tickets: [] }),
      });

      const json = await result.json();

      if (!result.ok) {
        throw new Error(json.message);
      }

      setTitle("");
      setCity("");
      setDate(null);

      addEvent(json);
      handleClose();
    } catch (error) {
      if (error instanceof Error) {
        setErrors(error.message);
      }
    }
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
            width: "36rem",
          }}
        >
          {
            errors && (
              <Alert severity="error">{errors}</Alert>
            )
          }

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
            <DatePicker
              label="Date"
              value={date}
              onChange={(value) => setDate(value)}
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
