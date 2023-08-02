import { UpdateNameDto } from '../../customers/dtos/update-name.dto';

export class UpdateTicketDto {
  barcode?: string;
  name?: UpdateNameDto;
}
