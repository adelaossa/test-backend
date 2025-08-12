import { Controller } from '@nestjs/common';
import { CrudControllerStructure, CrudControllerFrom } from '@solid-nestjs/rest-api';
import { Product } from '../entities/product.entity';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

const controllerStructure = CrudControllerStructure({
  entityType: Product,
  createInputType: CreateProductDto,
  updateInputType: UpdateProductDto,
  serviceType: ProductService,
  operations: {
    findAll: true,
    findOne: true,
    create: true,
    update: true,
    remove: true,
    softRemove: true,
    recover: true,
    hardRemove: true
  },
});

@Controller('products')
export class ProductController extends CrudControllerFrom(controllerStructure) {
  constructor(productService: ProductService) {
    super(productService);
  }
}