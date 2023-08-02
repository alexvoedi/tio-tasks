import { Typography } from "@mui/material";
import { EventsTable } from "../components/events-table";

export function EventPage() {
  return (
    <>
      <Typography variant="h3">
        Events
      </Typography>

      <EventsTable></EventsTable>
    </>
  );
}
