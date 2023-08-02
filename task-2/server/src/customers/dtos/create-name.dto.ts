import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNameDto {
  @IsString()
  @IsNotEmpty()
  first: string;

  @IsString()
  @IsNotEmpty()
  last: string;
}
