import { IsString, IsOptional, IsEmail, IsBoolean, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSupplierDto {
  @ApiProperty({
    description: 'Supplier name',
    example: 'Tech Supplies Inc.',
    maxLength: 200
  })
  @IsString()
  @Length(1, 200)
  name: string;

  @ApiPropertyOptional({
    description: 'Supplier description',
    example: 'Leading provider of technology products',
    maxLength: 500
  })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;

  @ApiPropertyOptional({
    description: 'Supplier email address',
    example: 'contact@techsupplies.com',
    maxLength: 100
  })
  @IsOptional()
  @IsEmail()
  @Length(0, 100)
  email?: string;

  @ApiPropertyOptional({
    description: 'Supplier phone number',
    example: '+1-555-123-4567',
    maxLength: 20
  })
  @IsOptional()
  @IsString()
  @Length(0, 20)
  phone?: string;

  @ApiPropertyOptional({
    description: 'Supplier address',
    example: '123 Tech Street, Silicon Valley, CA 94000',
    maxLength: 300
  })
  @IsOptional()
  @IsString()
  @Length(0, 300)
  address?: string;

  @ApiPropertyOptional({
    description: 'Supplier active status',
    example: true,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}