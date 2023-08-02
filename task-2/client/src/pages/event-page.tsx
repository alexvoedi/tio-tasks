import { Typography } from "@mui/material";
import { EventsTable } from "../components/events-table";
import { EventCreationModal } from "../components/event-creation-modal";
import { useEffect, useState } from "react";
import { Event } from "../interfaces/Event";

export function EventPage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const url = new URL("events", import.meta.env.VITE_BACKEND_URL);

      const result = await fetch(url, {
        headers: {
          Accept: "application/json",
        },
      });
      const json = await result.json();

      setEvents(json);
    };

    fetchEvents();
  }, []);

  return (
    <>
      <div className="flex gap">
        <Typography variant="h3">Events</Typography>

        <EventCreationModal
          addEvent={(event) => setEvents([...events, event])}
        ></EventCreationModal>
      </div>

      <EventsTable events={events}></EventsTable>
    </>
  );
}
