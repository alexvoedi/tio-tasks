import { CreateNameDto } from '../../customers/dtos/create-name.dto';

export class CreateTicketDto {
  eventId: string;
  barcode: string;
  name: CreateNameDto;
}
