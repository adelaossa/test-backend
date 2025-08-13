import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString, IsPositive, MaxLength } from 'class-validator';

@InputType()
export class CreateInvoiceItemInput {
  @Field(() => Int)
  @IsNumber()
  @IsPositive()
  quantity: number;

  @Field(() => Float)
  @IsNumber()
  @IsPositive()
  unitPrice: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @Field(() => Int)
  @IsNumber()
  productId: number;
}