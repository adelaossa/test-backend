import 'reflect-metadata';
import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SeederService } from './services/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.enableCors();

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Business Management API')
    .setDescription('API para gestión de productos, proveedores, clientes y facturas')
    .setVersion('1.0')
    .addTag('products', 'Operaciones CRUD para productos')
    .addTag('suppliers', 'Operaciones CRUD para proveedores')
    .addTag('customers', 'Operaciones CRUD para clientes')
    .addTag('invoices', 'Operaciones CRUD para facturas')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Run seeder
  const seederService = app.get(SeederService);
  await seederService.seed();

  const port = process.env.PORT || 3002;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation is available at: http://localhost:${port}/api`);
  console.log(`GraphQL endpoint is available at: http://localhost:${port}/graphql`);
}

bootstrap();