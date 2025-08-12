import { Injectable } from '@nestjs/common';
import { CrudServiceStructure, CrudServiceFrom } from '@solid-nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

const serviceStructure = CrudServiceStructure({
  entityType: Product,
  createInputType: CreateProductDto,
  updateInputType: UpdateProductDto,
  relationsConfig: {
    relations: {
      supplier: true,
    },
  },
});

@Injectable()
export class ProductService extends CrudServiceFrom(serviceStructure) {}