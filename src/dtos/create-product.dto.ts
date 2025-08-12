import { IsString, IsOptional, IsNumber, IsBoolean, Length, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product name',
    example: 'Laptop HP Pavilion',
    maxLength: 200
  })
  @IsString()
  @Length(1, 200)
  name: string;

  @ApiPropertyOptional({
    description: 'Product description',
    example: 'High-performance laptop for professional use',
    maxLength: 500
  })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;

  @ApiProperty({
    description: 'Product SKU (unique identifier)',
    example: 'LAP-HP-001',
    maxLength: 50
  })
  @IsString()
  @Length(1, 50)
  sku: string;

  @ApiProperty({
    description: 'Product price',
    example: 899.99,
    minimum: 0
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;

  @ApiPropertyOptional({
    description: 'Product stock quantity',
    example: 50,
    minimum: 0,
    default: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @ApiPropertyOptional({
    description: 'Product active status',
    example: true,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Supplier ID',
    example: 1
  })
  @IsOptional()
  @IsNumber()
  supplierId?: number;
}