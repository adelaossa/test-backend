import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from '../entities/supplier.entity';
import { SupplierService } from '../services/supplier.service';
import { SupplierController } from '../controllers/supplier.controller';
import { SupplierResolver } from '../resolvers/supplier.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier])],
  providers: [SupplierService, SupplierResolver],
  controllers: [SupplierController],
  exports: [SupplierService],
})
export class SupplierModule {}