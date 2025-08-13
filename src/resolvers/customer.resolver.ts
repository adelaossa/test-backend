import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../entities/customer.entity';
import { CreateCustomerInput } from '../dtos/graphql/create-customer.input';
import { UpdateCustomerInput } from '../dtos/graphql/update-customer.input';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => [Customer], { name: 'customers' })
  async findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @Query(() => Customer, { name: 'customer' })
  async findOne(@Args('id', { type: () => ID }) id: number): Promise<Customer> {
    return this.customerService.findOne(id);
  }

  @Mutation(() => Customer)
  async createCustomer(@Args('input') input: CreateCustomerInput): Promise<Customer> {
    return this.customerService.create(input);
  }

  @Mutation(() => Customer)
  async updateCustomer(
    @Args('id', { type: () => ID }) id: number,
    @Args('input') input: UpdateCustomerInput,
  ): Promise<Customer> {
    return this.customerService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteCustomer(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    await this.customerService.remove(id);
    return true;
  }

  @Mutation(() => Boolean)
  async restoreCustomer(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    await this.customerService.restore(id);
    return true;
  }
}