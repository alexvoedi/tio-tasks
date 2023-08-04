import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Event } from "../interfaces/Event";
import { EventEditingModal } from "./event-editing-modal";
import { TicketCreationModal } from "./ticket-creation-modal";
import { TicketEditingModal } from "./ticket-editing-modal";
import { Ticket } from "../interfaces/Ticket";

export function EventsTable({
  events,
  deleteEvent,
  updateEvent,
  deleteTicket,
  updateTicket,
}: {
  events: Event[];
  deleteEvent: (id: string) => void;
  updateEvent: (event: Event) => void;
  deleteTicket: (eventId: string, ticketId: string) => void;
  updateTicket: (ticket: Ticket) => void;
}) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Tickets</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {events.length > 0 ? (
            events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.title}</TableCell>
                <TableCell>{event.city}</TableCell>
                <TableCell>
                  {new Date(event.date).toLocaleDateString("en-US")}
                </TableCell>

                <TableCell>
                  {event.tickets.length > 0 ? (
                    event.tickets.map((ticket) => (
                      <div key={ticket.id}>
                        <div>
                          <span>Barcode:</span>
                          <pre>{ticket.barcode}</pre>
                        </div>
                        <div>
                          <div>Name:</div>
                          <div>
                            {ticket.name.first} {ticket.name.last}
                          </div>
                        </div>

                        <IconButton
                          onClick={() => deleteTicket(event.id, ticket.id)}
                        >
                          <DeleteIcon />
                        </IconButton>

                        <TicketEditingModal
                          ticket={ticket}
                          updateTicket={updateTicket}
                        ></TicketEditingModal>
                      </div>
                    ))
                  ) : (
                    <span>No tickets</span>
                  )}

                  <TicketCreationModal
                    event={event}
                    addTicket={(ticket) => {
                      event.tickets.push(ticket);
                      updateEvent(event);
                    }}
                  ></TicketCreationModal>
                </TableCell>

                <TableCell>
                  <EventEditingModal
                    event={event}
                    updateEvent={updateEvent}
                  ></EventEditingModal>

                  <IconButton
                    onClick={() => deleteEvent(event.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}>No events</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
