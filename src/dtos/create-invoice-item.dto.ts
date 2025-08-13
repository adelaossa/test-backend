import { IsInt, IsNumber, IsOptional, IsPositive, MaxLength, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateInvoiceItemDto {
  @ApiProperty({
    description: 'Cantidad del producto en la factura',
    example: 5,
    minimum: 1,
    type: 'integer'
  })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({
    description: 'Precio unitario del producto',
    example: 899.99,
    type: 'number',
    format: 'decimal',
    minimum: 0.01
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  unitPrice: number;

  @ApiPropertyOptional({
    description: 'Descripción adicional del item',
    example: 'Laptop con configuración especial',
    maxLength: 500
  })
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @ApiProperty({
    description: 'ID del producto asociado al item',
    example: 1,
    type: 'integer',
    minimum: 1
  })
  @IsInt()
  @IsPositive()
  productId: number;
}