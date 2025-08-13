import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { SupplierService } from '../services/supplier.service';
import { Supplier } from '../entities/supplier.entity';
import { CreateSupplierInput } from '../dtos/graphql/create-supplier.input';
import { UpdateSupplierInput } from '../dtos/graphql/update-supplier.input';

@Resolver(() => Supplier)
export class SupplierResolver {
  constructor(private readonly supplierService: SupplierService) {}

  @Query(() => [Supplier], { name: 'suppliers' })
  async findAll(): Promise<Supplier[]> {
    const result = await this.supplierService.findAll({}, {}) as any;
    return Array.isArray(result) ? result : (result.data || []);
  }

  @Query(() => Supplier, { name: 'supplier' })
  async findOne(@Args('id', { type: () => ID }) id: number): Promise<Supplier> {
    return this.supplierService.findOne({}, id);
  }

  @Mutation(() => Supplier)
  async createSupplier(@Args('input') input: CreateSupplierInput): Promise<Supplier> {
    return this.supplierService.create({}, input);
  }

  @Mutation(() => Supplier)
  async updateSupplier(
    @Args('id', { type: () => ID }) id: number,
    @Args('input') input: UpdateSupplierInput,
  ): Promise<Supplier> {
    return this.supplierService.update({}, id, input);
  }

  @Mutation(() => Boolean)
  async deleteSupplier(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    await this.supplierService.remove({}, id);
    return true;
  }

  @Mutation(() => Boolean)
  async softDeleteSupplier(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    await this.supplierService.softRemove({}, id);
    return true;
  }

  @Mutation(() => Boolean)
  async restoreSupplier(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    // Implementar método de restauración personalizado si no existe
    return true;
  }
}