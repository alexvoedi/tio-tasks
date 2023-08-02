import {
  IsNotEmpty,
  IsObject,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateNameDto } from '../../customers/dtos/create-name.dto';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  eventId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(8)
  barcode: string;

  @IsObject()
  @ValidateNested()
  name: CreateNameDto;
}
