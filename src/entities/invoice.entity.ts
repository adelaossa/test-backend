import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, ID, Float, registerEnumType } from '@nestjs/graphql';
import { Customer } from './customer.entity';
import { InvoiceItem } from './invoice-item.entity';

export enum InvoiceStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  PAID = 'paid',
  CANCELLED = 'cancelled'
}

registerEnumType(InvoiceStatus, {
  name: 'InvoiceStatus',
});

@ObjectType()
@Entity()
export class Invoice {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true, length: 50 })
  invoiceNumber: string;

  @Field(() => Date)
  @Column({ type: 'datetime' })
  invoiceDate: Date;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'datetime', nullable: true })
  dueDate?: Date;

  @Field(() => InvoiceStatus)
  @Column({
    type: 'text',
    default: InvoiceStatus.DRAFT
  })
  status: InvoiceStatus;

  @Field(() => Float)
  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  subtotal: number;

  @Field(() => Float)
  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  taxAmount: number;

  @Field(() => Float)
  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  total: number;

  @Field({ nullable: true })
  @Column({ length: 500, nullable: true })
  notes?: string;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field()
  @Column()
  customerId: number;

  @Field(() => Customer)
  @ManyToOne(() => Customer, (customer) => customer.invoices)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @Field(() => [InvoiceItem], { nullable: true })
  @OneToMany(() => InvoiceItem, (item) => item.invoice, { cascade: true })
  items: InvoiceItem[];

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}