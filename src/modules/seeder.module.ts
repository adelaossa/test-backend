import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Supplier } from '../entities/supplier.entity';
import { Customer } from '../entities/customer.entity';
import { Invoice } from '../entities/invoice.entity';
import { InvoiceItem } from '../entities/invoice-item.entity';
import { SeederService } from '../services/seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Supplier, Customer, Invoice, InvoiceItem])],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}