import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Supplier } from './entities/supplier.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [Product, Supplier],
  synchronize: true,
  logging: true,
};