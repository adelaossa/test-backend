import { Injectable } from '@nestjs/common';
import { CrudServiceStructure, CrudServiceFrom } from '@solid-nestjs/typeorm';
import { Supplier } from '../entities/supplier.entity';
import { CreateSupplierDto } from '../dtos/create-supplier.dto';
import { UpdateSupplierDto } from '../dtos/update-supplier.dto';

const serviceStructure = CrudServiceStructure({
  entityType: Supplier,
  createInputType: CreateSupplierDto,
  updateInputType: UpdateSupplierDto,
  relationsConfig: {
    relations: {
      products: true,
    },
  },
});

@Injectable()
export class SupplierService extends CrudServiceFrom(serviceStructure) {}