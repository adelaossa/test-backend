import { InputType, Field, Float, Int, PartialType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { CreateProductInput } from './create-product.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field(() => Float, { nullable: true })
  @IsOptional()
  price?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  stock?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  supplierId?: number;
}