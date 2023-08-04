import { CreateTicketDto } from '../../tickets/dtos/create-ticket.dto';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsDateString,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDateString()
  date: Date;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsArray()
  @ValidateNested({ each: true })
  tickets?: CreateTicketDto[];
}
