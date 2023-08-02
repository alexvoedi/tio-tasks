import { Name } from "./Name";

export interface Ticket {
  id: string;
  eventId: string;
  barcode: string;
  name: Name;
}
