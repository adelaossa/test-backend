import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Invoice } from './invoice.entity';

@ObjectType()
@Entity()
export class Customer {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 200 })
  name: string;

  @Field({ nullable: true })
  @Column({ length: 100, nullable: true })
  email?: string;

  @Field({ nullable: true })
  @Column({ length: 20, nullable: true })
  phone?: string;

  @Field({ nullable: true })
  @Column({ length: 300, nullable: true })
  address?: string;

  @Field({ nullable: true })
  @Column({ length: 50, nullable: true })
  taxId?: string; // RUC, NIT, etc.

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field(() => [Invoice], { nullable: true })
  @OneToMany(() => Invoice, (invoice) => invoice.customer)
  invoices: Invoice[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}