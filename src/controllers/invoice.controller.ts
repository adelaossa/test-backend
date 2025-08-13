import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiBody } from '@nestjs/swagger';
import { InvoiceService } from '../services/invoice.service';
import { CreateInvoiceDto } from '../dtos/create-invoice.dto';
import { UpdateInvoiceDto } from '../dtos/update-invoice.dto';
import { InvoiceStatus } from '../entities/invoice.entity';

@ApiTags('invoices')
@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva factura', description: 'Crea una nueva factura con sus items asociados' })
  @ApiResponse({ status: 201, description: 'Factura creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(createInvoiceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las facturas', description: 'Lista todas las facturas, opcionalmente filtradas por estado' })
  @ApiQuery({ name: 'status', required: false, enum: InvoiceStatus, description: 'Filtrar por estado de factura' })
  @ApiResponse({ status: 200, description: 'Lista de facturas obtenida exitosamente' })
  findAll(@Query('status') status?: InvoiceStatus) {
    if (status) {
      return this.invoiceService.findByStatus(status);
    }
    return this.invoiceService.findAll();
  }

  @Get('customer/:customerId')
  @ApiOperation({ summary: 'Obtener facturas por cliente', description: 'Lista todas las facturas de un cliente específico' })
  @ApiParam({ name: 'customerId', description: 'ID del cliente', type: 'number' })
  @ApiResponse({ status: 200, description: 'Facturas del cliente obtenidas exitosamente' })
  findByCustomer(@Param('customerId') customerId: string) {
    return this.invoiceService.findByCustomer(+customerId);
  }

  @Get('date-range')
  @ApiOperation({ summary: 'Obtener facturas por rango de fechas', description: 'Lista facturas dentro de un rango de fechas específico' })
  @ApiQuery({ name: 'startDate', description: 'Fecha de inicio (YYYY-MM-DD)', example: '2024-01-01' })
  @ApiQuery({ name: 'endDate', description: 'Fecha de fin (YYYY-MM-DD)', example: '2024-12-31' })
  @ApiResponse({ status: 200, description: 'Facturas en el rango de fechas obtenidas exitosamente' })
  findByDateRange(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string
  ) {
    return this.invoiceService.findByDateRange(new Date(startDate), new Date(endDate));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener factura por ID', description: 'Obtiene una factura específica con todos sus detalles e items' })
  @ApiParam({ name: 'id', description: 'ID de la factura', type: 'number' })
  @ApiResponse({ status: 200, description: 'Factura obtenida exitosamente' })
  @ApiResponse({ status: 404, description: 'Factura no encontrada' })
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar factura', description: 'Actualiza los datos de una factura existente' })
  @ApiParam({ name: 'id', description: 'ID de la factura', type: 'number' })
  @ApiResponse({ status: 200, description: 'Factura actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'Factura no encontrada' })
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceService.update(+id, updateInvoiceDto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Actualizar estado de factura', description: 'Cambia únicamente el estado de una factura' })
  @ApiParam({ name: 'id', description: 'ID de la factura', type: 'number' })
  @ApiBody({ schema: { type: 'object', properties: { status: { type: 'string', enum: ['draft', 'pending', 'paid', 'cancelled'] } } } })
  @ApiResponse({ status: 200, description: 'Estado de factura actualizado exitosamente' })
  updateStatus(@Param('id') id: string, @Body('status') status: InvoiceStatus) {
    return this.invoiceService.updateStatus(+id, status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar factura (soft delete)', description: 'Marca una factura como inactiva sin eliminarla físicamente' })
  @ApiParam({ name: 'id', description: 'ID de la factura', type: 'number' })
  @ApiResponse({ status: 200, description: 'Factura eliminada exitosamente' })
  remove(@Param('id') id: string) {
    return this.invoiceService.remove(+id);
  }

  @Delete(':id/hard')
  @ApiOperation({ summary: 'Eliminar factura permanentemente', description: 'Elimina una factura y sus items de forma permanente de la base de datos' })
  @ApiParam({ name: 'id', description: 'ID de la factura', type: 'number' })
  @ApiResponse({ status: 200, description: 'Factura eliminada permanentemente' })
  hardRemove(@Param('id') id: string) {
    return this.invoiceService.hardRemove(+id);
  }

  @Patch(':id/recover')
  @ApiOperation({ summary: 'Restaurar factura', description: 'Restaura una factura previamente eliminada (soft delete)' })
  @ApiParam({ name: 'id', description: 'ID de la factura', type: 'number' })
  @ApiResponse({ status: 200, description: 'Factura restaurada exitosamente' })
  restore(@Param('id') id: string) {
    return this.invoiceService.restore(+id);
  }
}