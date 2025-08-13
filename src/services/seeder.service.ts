import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from '../entities/supplier.entity';
import { Product } from '../entities/product.entity';
import { Customer } from '../entities/customer.entity';
import { Invoice } from '../entities/invoice.entity';
import { InvoiceItem } from '../entities/invoice-item.entity';
import { InvoiceStatus } from '../entities/invoice.entity';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
    @InjectRepository(InvoiceItem)
    private invoiceItemRepository: Repository<InvoiceItem>,
  ) {}

  async seed(): Promise<void> {
    try {
      // Check if data already exists
      const supplierCount = await this.supplierRepository.count();
      const productCount = await this.productRepository.count();
      const customerCount = await this.customerRepository.count();
      const invoiceCount = await this.invoiceRepository.count();

      if (supplierCount > 0 || productCount > 0 || customerCount > 0 || invoiceCount > 0) {
        this.logger.log('Database already contains data, skipping seeding');
        return;
      }

      this.logger.log('Starting database seeding...');

      // Create suppliers
      const suppliers = await this.createSuppliers();
      this.logger.log(`Created ${suppliers.length} suppliers`);

      // Create products
      const products = await this.createProducts(suppliers);
      this.logger.log(`Created ${products.length} products`);

      // Create customers
      const customers = await this.createCustomers();
      this.logger.log(`Created ${customers.length} customers`);

      // Create invoices with items
      const invoices = await this.createInvoices(customers, products);
      this.logger.log(`Created ${invoices.length} invoices`);

      this.logger.log('Database seeding completed successfully');
    } catch (error) {
      this.logger.error('Error during database seeding:', error);
      throw error;
    }
  }

  private async createSuppliers(): Promise<Supplier[]> {
    const suppliersData = [
      {
        name: 'Tech Solutions Inc.',
        description: 'Leading provider of technology products and solutions',
        email: 'contact@techsolutions.com',
        phone: '+1-555-123-4567',
        address: '123 Tech Street, Silicon Valley, CA 94000',
        isActive: true,
      },
      {
        name: 'Global Electronics',
        description: 'Worldwide distributor of electronic components',
        email: 'sales@globalelectronics.com',
        phone: '+1-555-987-6543',
        address: '456 Electronics Ave, Austin, TX 78701',
        isActive: true,
      },
      {
        name: 'Office Supplies Co.',
        description: 'Complete office supply solutions for businesses',
        email: 'info@officesupplies.com',
        phone: '+1-555-456-7890',
        address: '789 Business Blvd, New York, NY 10001',
        isActive: true,
      },
      {
        name: 'Industrial Equipment Ltd.',
        description: 'Heavy machinery and industrial equipment supplier',
        email: 'orders@industrialequip.com',
        phone: '+1-555-321-0987',
        address: '321 Industrial Way, Detroit, MI 48201',
        isActive: true,
      },
    ];

    const suppliers = this.supplierRepository.create(suppliersData);
    return await this.supplierRepository.save(suppliers);
  }

  private async createProducts(suppliers: Supplier[]): Promise<Product[]> {
    const productsData = [
      // Tech Solutions Inc. products
      {
        name: 'Laptop HP Pavilion 15',
        description: 'High-performance laptop with Intel i7 processor, 16GB RAM, 512GB SSD',
        sku: 'LAP-HP-001',
        price: 899.99,
        stock: 25,
        isActive: true,
        supplier: suppliers[0],
      },
      {
        name: 'Monitor Dell UltraSharp 27"',
        description: '4K UHD monitor with USB-C connectivity and adjustable stand',
        sku: 'MON-DELL-001',
        price: 449.99,
        stock: 15,
        isActive: true,
        supplier: suppliers[0],
      },
      {
        name: 'Wireless Mouse Logitech MX Master 3',
        description: 'Advanced wireless mouse with precision tracking and customizable buttons',
        sku: 'MOU-LOG-001',
        price: 99.99,
        stock: 50,
        isActive: true,
        supplier: suppliers[0],
      },

      // Global Electronics products
      {
        name: 'Smartphone Samsung Galaxy S23',
        description: 'Latest flagship smartphone with 5G connectivity and triple camera',
        sku: 'PHO-SAM-001',
        price: 799.99,
        stock: 30,
        isActive: true,
        supplier: suppliers[1],
      },
      {
        name: 'Tablet iPad Pro 12.9"',
        description: 'Professional tablet with M2 chip and Apple Pencil support',
        sku: 'TAB-APP-001',
        price: 1099.99,
        stock: 20,
        isActive: true,
        supplier: suppliers[1],
      },
      {
        name: 'Wireless Headphones Sony WH-1000XM5',
        description: 'Premium noise-canceling headphones with 30-hour battery life',
        sku: 'HEAD-SONY-001',
        price: 399.99,
        stock: 35,
        isActive: true,
        supplier: suppliers[1],
      },

      // Office Supplies Co. products
      {
        name: 'Office Chair Ergonomic Pro',
        description: 'Ergonomic office chair with lumbar support and adjustable height',
        sku: 'CHAIR-ERG-001',
        price: 299.99,
        stock: 40,
        isActive: true,
        supplier: suppliers[2],
      },
      {
        name: 'Desk Standing Converter',
        description: 'Adjustable standing desk converter for healthy work posture',
        sku: 'DESK-STAND-001',
        price: 199.99,
        stock: 18,
        isActive: true,
        supplier: suppliers[2],
      },
      {
        name: 'Printer Laser HP LaserJet Pro',
        description: 'High-speed laser printer with wireless connectivity and duplex printing',
        sku: 'PRT-HP-001',
        price: 249.99,
        stock: 12,
        isActive: true,
        supplier: suppliers[2],
      },

      // Industrial Equipment Ltd. products
      {
        name: 'Drill Press Industrial 16"',
        description: 'Heavy-duty drill press for industrial applications with variable speed',
        sku: 'DRILL-IND-001',
        price: 1299.99,
        stock: 8,
        isActive: true,
        supplier: suppliers[3],
      },
      {
        name: 'Air Compressor 50 Gallon',
        description: 'Industrial air compressor with 50-gallon tank and dual-stage pump',
        sku: 'COMP-AIR-001',
        price: 899.99,
        stock: 5,
        isActive: true,
        supplier: suppliers[3],
      },
      {
        name: 'Welding Machine MIG/TIG',
        description: 'Professional welding machine with MIG/TIG capabilities and digital display',
        sku: 'WELD-PRO-001',
        price: 1599.99,
        stock: 3,
        isActive: true,
        supplier: suppliers[3],
      },
    ];

    const products = this.productRepository.create(productsData);
    return await this.productRepository.save(products);
  }

  private async createCustomers(): Promise<Customer[]> {
    const customersData = [
      {
        name: 'Acme Corporation',
        email: 'contact@acmecorp.com',
        phone: '+1-555-111-2222',
        address: '123 Business Ave, Corporate City, NY 10001',
        taxId: 'TAX123456789',
        isActive: true,
      },
      {
        name: 'Global Enterprises Ltd.',
        email: 'info@globalenterprises.com',
        phone: '+1-555-333-4444',
        address: '456 Commerce St, Trade Town, CA 90210',
        taxId: 'TAX987654321',
        isActive: true,
      },
      {
        name: 'TechStart Solutions',
        email: 'hello@techstart.com',
        phone: '+1-555-555-6666',
        address: '789 Innovation Blvd, Silicon Valley, CA 94000',
        taxId: 'TAX456789123',
        isActive: true,
      },
      {
        name: 'Manufacturing Plus Inc.',
        email: 'orders@manufacturingplus.com',
        phone: '+1-555-777-8888',
        address: '321 Industrial Park, Factory City, TX 75001',
        taxId: 'TAX789123456',
        isActive: true,
      },
      {
        name: 'Retail Chain Store',
        email: 'purchasing@retailchain.com',
        phone: '+1-555-999-0000',
        address: '654 Shopping Mall, Retail City, FL 33101',
        taxId: 'TAX321654987',
        isActive: true,
      },
    ];

    const customers = this.customerRepository.create(customersData);
    return await this.customerRepository.save(customers);
  }

  private async createInvoices(customers: Customer[], products: Product[]): Promise<Invoice[]> {
    const invoicesData = [];
    const currentDate = new Date();

    // Invoice 1 - Acme Corporation
    invoicesData.push({
      invoiceNumber: 'INV-2024-001',
      invoiceDate: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 15),
      dueDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      status: InvoiceStatus.PAID,
      notes: 'Pago realizado mediante transferencia bancaria',
      customerId: customers[0].id,
      customer: customers[0],
      isActive: true,
      items: [
        {
          quantity: 5,
          unitPrice: products[0].price,
          totalPrice: 5 * products[0].price,
          productId: products[0].id,
          product: products[0],
          isActive: true,
        },
        {
          quantity: 3,
          unitPrice: products[1].price,
          totalPrice: 3 * products[1].price,
          productId: products[1].id,
          product: products[1],
          isActive: true,
        }
      ]
    });

    // Invoice 2 - Global Enterprises Ltd.
    invoicesData.push({
      invoiceNumber: 'INV-2024-002',
      invoiceDate: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 28),
      dueDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), 28),
      status: InvoiceStatus.PENDING,
      notes: 'Factura pendiente de pago - recordatorio enviado',
      customerId: customers[1].id,
      customer: customers[1],
      isActive: true,
      items: [
        {
          quantity: 10,
          unitPrice: products[3].price,
          totalPrice: 10 * products[3].price,
          productId: products[3].id,
          product: products[3],
          isActive: true,
        },
        {
          quantity: 15,
          unitPrice: products[5].price,
          totalPrice: 15 * products[5].price,
          productId: products[5].id,
          product: products[5],
          isActive: true,
        }
      ]
    });

    // Invoice 3 - TechStart Solutions
    invoicesData.push({
      invoiceNumber: 'INV-2024-003',
      invoiceDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), 5),
      dueDate: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 5),
      status: InvoiceStatus.DRAFT,
      notes: 'Borrador - pendiente de aprobación del cliente',
      customerId: customers[2].id,
      customer: customers[2],
      isActive: true,
      items: [
        {
          quantity: 20,
          unitPrice: products[2].price,
          totalPrice: 20 * products[2].price,
          productId: products[2].id,
          product: products[2],
          isActive: true,
        },
        {
          quantity: 8,
          unitPrice: products[6].price,
          totalPrice: 8 * products[6].price,
          productId: products[6].id,
          product: products[6],
          isActive: true,
        }
      ]
    });

    // Invoice 4 - Manufacturing Plus Inc.
    invoicesData.push({
      invoiceNumber: 'INV-2024-004',
      invoiceDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
      dueDate: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 10),
      status: InvoiceStatus.PAID,
      notes: 'Pago recibido por cheque - orden completada',
      customerId: customers[3].id,
      customer: customers[3],
      isActive: true,
      items: [
        {
          quantity: 2,
          unitPrice: products[9].price,
          totalPrice: 2 * products[9].price,
          productId: products[9].id,
          product: products[9],
          isActive: true,
        },
        {
          quantity: 1,
          unitPrice: products[10].price,
          totalPrice: 1 * products[10].price,
          productId: products[10].id,
          product: products[10],
          isActive: true,
        }
      ]
    });

    // Invoice 5 - Retail Chain Store
    invoicesData.push({
      invoiceNumber: 'INV-2024-005',
      invoiceDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), 20),
      dueDate: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 20),
      status: InvoiceStatus.PENDING,
      notes: 'Orden urgente - entrega programada',
      customerId: customers[4].id,
      customer: customers[4],
      isActive: true,
      items: [
        {
          quantity: 12,
          unitPrice: products[4].price,
          totalPrice: 12 * products[4].price,
          productId: products[4].id,
          product: products[4],
          isActive: true,
        },
        {
          quantity: 6,
          unitPrice: products[8].price,
          totalPrice: 6 * products[8].price,
          productId: products[8].id,
          product: products[8],
          isActive: true,
        }
      ]
    });

    // Calculate totals for each invoice
    for (const invoiceData of invoicesData) {
      const subtotal = invoiceData.items.reduce((sum, item) => sum + item.totalPrice, 0);
      const taxRate = 0.10; // 10% tax
      const taxAmount = subtotal * taxRate;
      const total = subtotal + taxAmount;

      invoiceData.subtotal = subtotal;
      invoiceData.taxAmount = taxAmount;
      invoiceData.total = total;
    }

    const invoices = this.invoiceRepository.create(invoicesData);
    const savedInvoices = await this.invoiceRepository.save(invoices);

    return savedInvoices;
  }

}