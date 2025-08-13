import { IsString, IsDateString, IsOptional, IsEnum, IsInt, IsPositive, MaxLength, Length, IsArray, ValidateNested, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { InvoiceStatus } from '../entities/invoice.entity';
import { CreateInvoiceItemDto } from './create-invoice-item.dto';

export class CreateInvoiceDto {
  @ApiProperty({
    description: 'Número único de la factura',
    example: 'INV-2024-001',
    minLength: 1,
    maxLength: 50
  })
  @IsString()
  @Length(1, 50)
  invoiceNumber: string;

  @ApiProperty({
    description: 'Fecha de emisión de la factura',
    example: '2024-08-13',
    type: 'string',
    format: 'date'
  })
  @IsDateString()
  invoiceDate: string;

  @ApiPropertyOptional({
    description: 'Fecha de vencimiento de la factura',
    example: '2024-09-13',
    type: 'string',
    format: 'date'
  })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiPropertyOptional({
    description: 'Estado actual de la factura',
    enum: InvoiceStatus,
    example: InvoiceStatus.DRAFT,
    default: InvoiceStatus.DRAFT
  })
  @IsOptional()
  @IsEnum(InvoiceStatus)
  status?: InvoiceStatus;

  @ApiPropertyOptional({
    description: 'Monto de impuestos aplicados',
    example: 150.00,
    minimum: 0,
    type: 'number',
    format: 'decimal'
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  taxAmount?: number;

  @ApiPropertyOptional({
    description: 'Notas adicionales sobre la factura',
    example: 'Pago realizado mediante transferencia bancaria',
    maxLength: 500
  })
  @IsOptional()
  @MaxLength(500)
  notes?: string;

  @ApiProperty({
    description: 'ID del cliente asociado a la factura',
    example: 1,
    type: 'integer',
    minimum: 1
  })
  @IsInt()
  @IsPositive()
  customerId: number;

  @ApiProperty({
    description: 'Lista de items de la factura',
    type: [CreateInvoiceItemDto],
    isArray: true
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceItemDto)
  items: CreateInvoiceItemDto[];
}