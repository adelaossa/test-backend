import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CustomerService } from '../services/customer.service';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';

@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo cliente', description: 'Crea un nuevo cliente en el sistema' })
  @ApiResponse({ status: 201, description: 'Cliente creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los clientes', description: 'Lista todos los clientes activos en el sistema' })
  @ApiResponse({ status: 200, description: 'Lista de clientes obtenida exitosamente' })
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener cliente por ID', description: 'Obtiene un cliente específico por su ID' })
  @ApiParam({ name: 'id', description: 'ID del cliente', type: 'number' })
  @ApiResponse({ status: 200, description: 'Cliente obtenido exitosamente' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar cliente', description: 'Actualiza los datos de un cliente existente' })
  @ApiParam({ name: 'id', description: 'ID del cliente', type: 'number' })
  @ApiResponse({ status: 200, description: 'Cliente actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar cliente (soft delete)', description: 'Marca un cliente como inactivo sin eliminarlo físicamente' })
  @ApiParam({ name: 'id', description: 'ID del cliente', type: 'number' })
  @ApiResponse({ status: 200, description: 'Cliente eliminado exitosamente' })
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }

  @Delete(':id/hard')
  @ApiOperation({ summary: 'Eliminar cliente permanentemente', description: 'Elimina un cliente de forma permanente de la base de datos' })
  @ApiParam({ name: 'id', description: 'ID del cliente', type: 'number' })
  @ApiResponse({ status: 200, description: 'Cliente eliminado permanentemente' })
  hardRemove(@Param('id') id: string) {
    return this.customerService.hardRemove(+id);
  }

  @Patch(':id/recover')
  @ApiOperation({ summary: 'Restaurar cliente', description: 'Restaura un cliente previamente eliminado (soft delete)' })
  @ApiParam({ name: 'id', description: 'ID del cliente', type: 'number' })
  @ApiResponse({ status: 200, description: 'Cliente restaurado exitosamente' })
  restore(@Param('id') id: string) {
    return this.customerService.restore(+id);
  }
}