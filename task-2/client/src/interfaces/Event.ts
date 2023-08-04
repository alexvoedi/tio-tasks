import { Ticket } from "./Ticket";

export interface Event {
  id: string;
  title: string;
  date: string;
  city: string;
  tickets: Ticket[]
}
