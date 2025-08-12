import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from '../entities/supplier.entity';
import { Product } from '../entities/product.entity';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async seed(): Promise<void> {
    try {
      // Check if data already exists
      const supplierCount = await this.supplierRepository.count();
      const productCount = await this.productRepository.count();

      if (supplierCount > 0 || productCount > 0) {
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
}