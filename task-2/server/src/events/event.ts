import { BaseEntity } from '../db/base.entity';
import { Ticket } from '../tickets/ticket';

export class Event extends BaseEntity {
  title: string;
  date: Date;
  city: string;
  tickets: Ticket[];
}
