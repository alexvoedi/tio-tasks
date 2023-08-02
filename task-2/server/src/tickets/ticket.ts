import { Name } from '../customers/name';
import { BaseEntity } from '../db/base.entity';
import { ID } from '../db/identifier';

export class Ticket extends BaseEntity {
  eventId: ID;
  barcode: string;
  name: Name;
}
