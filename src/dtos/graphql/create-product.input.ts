import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsNumber, IsPositive, MaxLength } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsString()
  @MaxLength(200)
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @Field()
  @IsString()
  @MaxLength(50)
  sku: string;

  @Field(() => Float)
  @IsNumber()
  @IsPositive()
  price: number;

  @Field(() => Int, { defaultValue: 0 })
  @IsNumber()
  stock: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  supplierId?: number;
}