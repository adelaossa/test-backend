import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsString, IsOptional, IsNumber, IsEnum, IsDateString, MaxLength } from 'class-validator';
import { InvoiceStatus } from '../../entities/invoice.entity';
import { CreateInvoiceItemInput } from './create-invoice-item.input';

@InputType()
export class CreateInvoiceInput {
  @Field()
  @IsString()
  @MaxLength(50)
  invoiceNumber: string;

  @Field()
  @IsDateString()
  invoiceDate: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @Field(() => InvoiceStatus, { defaultValue: InvoiceStatus.DRAFT })
  @IsOptional()
  @IsEnum(InvoiceStatus)
  status?: InvoiceStatus;

  @Field(() => Float, { defaultValue: 0 })
  @IsOptional()
  @IsNumber()
  taxAmount?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;

  @Field(() => Int)
  @IsNumber()
  customerId: number;

  @Field(() => [CreateInvoiceItemInput])
  items: CreateInvoiceItemInput[];
}