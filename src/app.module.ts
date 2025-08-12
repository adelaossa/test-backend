import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database.config';
import { ProductModule } from './modules/product.module';
import { SupplierModule } from './modules/supplier.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    ProductModule,
    SupplierModule,
  ],
})
export class AppModule {}