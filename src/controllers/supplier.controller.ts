import { Controller } from '@nestjs/common';
import { CrudControllerStructure, CrudControllerFrom } from '@solid-nestjs/rest-api';
import { Supplier } from '../entities/supplier.entity';
import { SupplierService } from '../services/supplier.service';
import { CreateSupplierDto } from '../dtos/create-supplier.dto';
import { UpdateSupplierDto } from '../dtos/update-supplier.dto';

const controllerStructure = CrudControllerStructure({
  entityType: Supplier,
  createInputType: CreateSupplierDto,
  updateInputType: UpdateSupplierDto,
  serviceType: SupplierService,
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

@Controller('suppliers')
export class SupplierController extends CrudControllerFrom(controllerStructure) {
  constructor(supplierService: SupplierService) {
    super(supplierService);
  }
}