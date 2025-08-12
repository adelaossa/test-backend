import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Supplier } from '../entities/supplier.entity';
import { SeederService } from '../services/seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Supplier])],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}