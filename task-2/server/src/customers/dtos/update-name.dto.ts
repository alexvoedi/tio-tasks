import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateNameDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  first?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  last?: string;
}
