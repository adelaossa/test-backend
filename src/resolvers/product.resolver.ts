import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ProductService } from '../services/product.service';
import { Product } from '../entities/product.entity';
import { CreateProductInput } from '../dtos/graphql/create-product.input';
import { UpdateProductInput } from '../dtos/graphql/update-product.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product], { name: 'products' })
  async findAll(): Promise<Product[]> {
    const result = await this.productService.findAll({}, {}) as any;
    return Array.isArray(result) ? result : (result.data || []);
  }

  @Query(() => Product, { name: 'product' })
  async findOne(@Args('id', { type: () => ID }) id: number): Promise<Product> {
    return this.productService.findOne({}, id);
  }

  @Mutation(() => Product)
  async createProduct(@Args('input') input: CreateProductInput): Promise<Product> {
    return this.productService.create({}, input);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('id', { type: () => ID }) id: number,
    @Args('input') input: UpdateProductInput,
  ): Promise<Product> {
    return this.productService.update({}, id, input);
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    await this.productService.remove({}, id);
    return true;
  }

  @Mutation(() => Boolean)
  async softDeleteProduct(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    await this.productService.softRemove({}, id);
    return true;
  }

  @Mutation(() => Boolean)
  async restoreProduct(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    // Implementar método de restauración personalizado si no existe
    return true;
  }
}