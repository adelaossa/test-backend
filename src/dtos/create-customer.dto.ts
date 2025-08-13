import { IsString, IsEmail, IsOptional, Length, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'Nombre del cliente',
    example: 'Acme Corporation',
    minLength: 1,
    maxLength: 200
  })
  @IsString()
  @Length(1, 200)
  name: string;

  @ApiPropertyOptional({
    description: 'Email de contacto del cliente',
    example: 'contact@acmecorp.com',
    maxLength: 100
  })
  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  email?: string;

  @ApiPropertyOptional({
    description: 'Teléfono de contacto del cliente',
    example: '+1-555-111-2222',
    maxLength: 20
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiPropertyOptional({
    description: 'Dirección física del cliente',
    example: '123 Business Ave, Corporate City, NY 10001',
    maxLength: 300
  })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  address?: string;

  @ApiPropertyOptional({
    description: 'Número de identificación tributaria',
    example: 'TAX123456789',
    maxLength: 50
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  taxId?: string;
}