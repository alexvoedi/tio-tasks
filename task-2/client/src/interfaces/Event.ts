import { Ticket } from "./Ticket";

export interface Event {
  id: string;
  title: string;
  date: Date;
  city: string;
  tickets: Ticket[]
}
