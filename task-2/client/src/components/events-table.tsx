import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Event } from "../interfaces/Event";

export function EventsTable({ events }: { events: Event[] }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Date</TableCell>
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
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>No events</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
