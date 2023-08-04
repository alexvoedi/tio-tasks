import { Typography } from "@mui/material";
import { EventsTable } from "../components/events-table";
import { EventCreationModal } from "../components/event-creation-modal";
import { useEffect, useState } from "react";
import { Event } from "../interfaces/Event";
import { Ticket } from "../interfaces/Ticket";

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

  const deleteEvent = async (eventId: string) => {
    const url = new URL(`events/${eventId}`, import.meta.env.VITE_BACKEND_URL);

    await fetch(url, {
      method: "DELETE",
    });

    setEvents(events.filter((event) => event.id !== eventId));
  };

  const deleteTicket = async (eventId: string, ticketId: string) => {
    const url = new URL(`events/${eventId}/tickets/${ticketId}`, import.meta.env.VITE_BACKEND_URL);

    await fetch(url, {
      method: "DELETE",
    });

    setEvents(
      events.map((event) => {
        if (event.id === eventId) {
          return {
            ...event,
            tickets: event.tickets.filter((ticket) => ticket.id !== ticketId),
          };
        }

        return event;
      })
    );
  };

  const handleEventUpdate = (event: Event) => {
    setEvents(events.map((e) => (e.id === event.id ? {
      ...event,
      tickets: e.tickets,
    } : e)));
  };

  const handleTicketUpdate = (ticket: Ticket) => {
    setEvents(
      events.map((event) => {
        if (event.id === ticket.eventId) {
          return {
            ...event,
            tickets: event.tickets.map((t) => (t.id === ticket.id ? ticket : t)),
          };
        }

        return event;
      })
    );
  }

  return (
    <>
      <div className="flex gap">
        <Typography variant="h3">Events</Typography>

        <EventCreationModal
          addEvent={(event) => setEvents([...events, event])}
        ></EventCreationModal>
      </div>

      <EventsTable
        events={events}
        deleteEvent={deleteEvent}
        updateEvent={handleEventUpdate}
        deleteTicket={deleteTicket}
        updateTicket={handleTicketUpdate}
      ></EventsTable>
    </>
  );
}
