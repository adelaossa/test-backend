import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice, InvoiceStatus } from '../entities/invoice.entity';
import { InvoiceItem } from '../entities/invoice-item.entity';
import { CreateInvoiceDto } from '../dtos/create-invoice.dto';
import { UpdateInvoiceDto } from '../dtos/update-invoice.dto';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
    @InjectRepository(InvoiceItem)
    private invoiceItemRepository: Repository<InvoiceItem>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const { items, ...invoiceData } = createInvoiceDto;
    
    // Crear la factura
    const invoice = this.invoiceRepository.create({
      ...invoiceData,
      invoiceDate: new Date(invoiceData.invoiceDate),
      dueDate: invoiceData.dueDate ? new Date(invoiceData.dueDate) : null,
      status: invoiceData.status || InvoiceStatus.DRAFT
    });
    
    const savedInvoice = await this.invoiceRepository.save(invoice);
    
    // Crear los items
    const invoiceItems = items.map(item => {
      const totalPrice = item.quantity * item.unitPrice;
      return this.invoiceItemRepository.create({
        ...item,
        totalPrice,
        invoiceId: savedInvoice.id
      });
    });
    
    await this.invoiceItemRepository.save(invoiceItems);
    
    // Calcular totales
    await this.calculateTotals(savedInvoice.id);
    
    return await this.findOne(savedInvoice.id);
  }

  async findAll(): Promise<Invoice[]> {
    return await this.invoiceRepository.find({
      where: { isActive: true },
      relations: ['customer', 'items', 'items.product'],
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: number): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findOne({
      where: { id, isActive: true },
      relations: ['customer', 'items', 'items.product', 'items.product.supplier']
    });
    
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }
    
    return invoice;
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto): Promise<Invoice> {
    const { items, ...invoiceData } = updateInvoiceDto;
    
    // Actualizar la factura
    const updateData = {
      ...invoiceData,
      ...(invoiceData.invoiceDate && { invoiceDate: new Date(invoiceData.invoiceDate) }),
      ...(invoiceData.dueDate && { dueDate: new Date(invoiceData.dueDate) })
    };
    
    await this.invoiceRepository.update(id, updateData);
    
    // Si se proporcionan items, actualizar los items
    if (items) {
      // Eliminar items existentes
      await this.invoiceItemRepository.delete({ invoiceId: id });
      
      // Crear nuevos items
      const invoiceItems = items.map(item => {
        const totalPrice = item.quantity * item.unitPrice;
        return this.invoiceItemRepository.create({
          ...item,
          totalPrice,
          invoiceId: id
        });
      });
      
      await this.invoiceItemRepository.save(invoiceItems);
      
      // Recalcular totales
      await this.calculateTotals(id);
    }
    
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.invoiceRepository.update(id, { isActive: false });
  }

  async hardRemove(id: number): Promise<void> {
    // Eliminar items primero debido a la relación
    await this.invoiceItemRepository.delete({ invoiceId: id });
    await this.invoiceRepository.delete(id);
  }

  async restore(id: number): Promise<Invoice> {
    await this.invoiceRepository.update(id, { isActive: true });
    return await this.invoiceRepository.findOne({
      where: { id },
      relations: ['customer', 'items', 'items.product']
    });
  }

  async updateStatus(id: number, status: InvoiceStatus): Promise<Invoice> {
    await this.invoiceRepository.update(id, { status });
    return await this.findOne(id);
  }

  async findByCustomer(customerId: number): Promise<Invoice[]> {
    return await this.invoiceRepository.find({
      where: { customerId, isActive: true },
      relations: ['items', 'items.product'],
      order: { createdAt: 'DESC' }
    });
  }

  async findByStatus(status: InvoiceStatus): Promise<Invoice[]> {
    return await this.invoiceRepository.find({
      where: { status, isActive: true },
      relations: ['customer', 'items', 'items.product'],
      order: { createdAt: 'DESC' }
    });
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Invoice[]> {
    return await this.invoiceRepository.createQueryBuilder('invoice')
      .leftJoinAndSelect('invoice.customer', 'customer')
      .leftJoinAndSelect('invoice.items', 'items')
      .leftJoinAndSelect('items.product', 'product')
      .where('invoice.invoiceDate BETWEEN :startDate AND :endDate', { startDate, endDate })
      .andWhere('invoice.isActive = :isActive', { isActive: true })
      .orderBy('invoice.createdAt', 'DESC')
      .getMany();
  }

  private async calculateTotals(invoiceId: number): Promise<void> {
    const items = await this.invoiceItemRepository.find({
      where: { invoiceId }
    });
    
    const subtotal = items.reduce((sum, item) => sum + Number(item.totalPrice), 0);
    
    // Obtener el tax amount actual o usar 0 si no existe
    const invoice = await this.invoiceRepository.findOne({ where: { id: invoiceId } });
    const taxAmount = Number(invoice?.taxAmount) || 0;
    
    const total = subtotal + taxAmount;
    
    await this.invoiceRepository.update(invoiceId, {
      subtotal,
      total
    });
  }
}