import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepository.create(createCustomerDto);
    return await this.customerRepository.save(customer);
  }

  async findAll(): Promise<Customer[]> {
    return await this.customerRepository.find({
      where: { isActive: true },
      relations: ['invoices'],
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: number): Promise<Customer> {
    return await this.customerRepository.findOne({
      where: { id, isActive: true },
      relations: ['invoices']
    });
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    await this.customerRepository.update(id, updateCustomerDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.customerRepository.update(id, { isActive: false });
  }

  async hardRemove(id: number): Promise<void> {
    await this.customerRepository.delete(id);
  }

  async restore(id: number): Promise<Customer> {
    await this.customerRepository.update(id, { isActive: true });
    return await this.customerRepository.findOne({
      where: { id },
      relations: ['invoices']
    });
  }

  async findByEmail(email: string): Promise<Customer[]> {
    return await this.customerRepository.find({
      where: { email, isActive: true }
    });
  }

  async findByTaxId(taxId: string): Promise<Customer> {
    return await this.customerRepository.findOne({
      where: { taxId, isActive: true }
    });
  }
}