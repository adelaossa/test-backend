import { IsString, IsOptional, IsEmail, IsBoolean, Length } from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  @Length(1, 200)
  name: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;

  @IsOptional()
  @IsEmail()
  @Length(0, 100)
  email?: string;

  @IsOptional()
  @IsString()
  @Length(0, 20)
  phone?: string;

  @IsOptional()
  @IsString()
  @Length(0, 300)
  address?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}