import { CreateTicketDto } from '../../tickets/dtos/create-ticket.dto';
import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsArray,
  ValidateNested,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDate()
  date: Date;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsArray()
  @ValidateNested({ each: true })
  tickets?: CreateTicketDto[];
}
