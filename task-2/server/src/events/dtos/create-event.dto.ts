import { CreateTicketDto } from '../../tickets/dtos/create-ticket.dto';

export class CreateEventDto {
  title: string;
  date: Date;
  city: string;
  tickets?: CreateTicketDto[];
}
