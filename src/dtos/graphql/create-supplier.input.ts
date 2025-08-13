import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsEmail, MaxLength } from 'class-validator';

@InputType()
export class CreateSupplierInput {
  @Field()
  @IsString()
  @MaxLength(200)
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  address?: string;
}