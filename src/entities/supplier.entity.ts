import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Product } from './product.entity';

@ObjectType()
@Entity()
export class Supplier {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 200 })
  name: string;

  @Field({ nullable: true })
  @Column({ length: 500, nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Column({ length: 100, nullable: true })
  email?: string;

  @Field({ nullable: true })
  @Column({ length: 20, nullable: true })
  phone?: string;

  @Field({ nullable: true })
  @Column({ length: 300, nullable: true })
  address?: string;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field(() => [Product], { nullable: true })
  @OneToMany(() => Product, (product) => product.supplier)
  products: Product[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}