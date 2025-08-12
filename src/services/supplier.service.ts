import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
export class SupplierService extends CrudServiceFrom(serviceStructure) {
  constructor(
    @InjectRepository(Supplier)
    repository: Repository<Supplier>,
  ) {
    super(repository);
  }
}