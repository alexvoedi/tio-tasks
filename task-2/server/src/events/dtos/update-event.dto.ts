import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  city?: string;
}
