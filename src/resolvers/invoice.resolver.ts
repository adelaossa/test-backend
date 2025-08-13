import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { InvoiceService } from '../services/invoice.service';
import { Invoice, InvoiceStatus } from '../entities/invoice.entity';
import { CreateInvoiceInput } from '../dtos/graphql/create-invoice.input';
import { UpdateInvoiceInput } from '../dtos/graphql/update-invoice.input';

@Resolver(() => Invoice)
export class InvoiceResolver {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Query(() => [Invoice], { name: 'invoices' })
  async findAll(@Args('status', { type: () => InvoiceStatus, nullable: true }) status?: InvoiceStatus): Promise<Invoice[]> {
    if (status) {
      return this.invoiceService.findByStatus(status);
    }
    return this.invoiceService.findAll();
  }

  @Query(() => Invoice, { name: 'invoice' })
  async findOne(@Args('id', { type: () => ID }) id: number): Promise<Invoice> {
    return this.invoiceService.findOne(id);
  }

  @Query(() => [Invoice], { name: 'invoicesByCustomer' })
  async findByCustomer(@Args('customerId', { type: () => ID }) customerId: number): Promise<Invoice[]> {
    return this.invoiceService.findByCustomer(customerId);
  }

  @Mutation(() => Invoice)
  async createInvoice(@Args('input') input: CreateInvoiceInput): Promise<Invoice> {
    return this.invoiceService.create(input);
  }

  @Mutation(() => Invoice)
  async updateInvoice(
    @Args('id', { type: () => ID }) id: number,
    @Args('input') input: UpdateInvoiceInput,
  ): Promise<Invoice> {
    return this.invoiceService.update(id, input);
  }

  @Mutation(() => Invoice)
  async updateInvoiceStatus(
    @Args('id', { type: () => ID }) id: number,
    @Args('status', { type: () => InvoiceStatus }) status: InvoiceStatus,
  ): Promise<Invoice> {
    return this.invoiceService.updateStatus(id, status);
  }

  @Mutation(() => Boolean)
  async deleteInvoice(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    await this.invoiceService.remove(id);
    return true;
  }
}