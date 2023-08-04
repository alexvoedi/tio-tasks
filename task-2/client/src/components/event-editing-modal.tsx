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
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Event } from "../interfaces/Event";
import dayjs from 'dayjs';

export function EventEditingModal({
  event,
  updateEvent
}: {
  updateEvent: (event: Event) => void;
  event: Event;
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [title, setTitle] = useState(event.title);
  const [city, setCity] = useState(event.city);
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs(event.date));
  const [errors, setErrors] = useState<string | null>(null);

  const submit = async () => {
    setErrors(null);

    const url = new URL(`events/${event.id}`, import.meta.env.VITE_BACKEND_URL);

    try {
      const result = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, city, date }),
      });

      const json = await result.json();

      if (!result.ok) {
        throw new Error(json.message);
      }

      updateEvent(json);
      handleClose();
    } catch (error) {
      if (error instanceof Error) {
        setErrors(error.message);
      }
    }
  }

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
          <Button onClick={submit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
