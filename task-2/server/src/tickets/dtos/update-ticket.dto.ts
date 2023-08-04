import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { UpdateNameDto } from '../../customers/dtos/update-name.dto';

export class UpdateTicketDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(8)
  barcode?: string;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  name?: UpdateNameDto;
}
