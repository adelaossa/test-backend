import 'reflect-metadata';
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
    .setTitle('Products and Suppliers API')
    .setDescription('API para gestión de productos y proveedores')
    .setVersion('1.0')
    .addTag('products', 'Operaciones CRUD para productos')
    .addTag('suppliers', 'Operaciones CRUD para proveedores')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Run seeder
  const seederService = app.get(SeederService);
  await seederService.seed();

  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
  console.log('Swagger documentation is available at: http://localhost:3000/api');
}

bootstrap();