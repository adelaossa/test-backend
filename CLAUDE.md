# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Build**: `npm run build` - Compiles TypeScript to JavaScript in the `dist/` directory
- **Start Production**: `npm start` - Runs the compiled application from `dist/main.js`
- **Development**: `npm run dev` - Runs the application with hot reload using nodemon and ts-node
- **Test**: Currently no test framework configured (shows error message)

## Architecture Overview

This is a NestJS backend application for managing products and suppliers with the following architecture:

### Core Structure
- **Framework**: NestJS with TypeScript
- **Database**: SQLite with TypeORM ORM
- **API Documentation**: Swagger UI available at `/api` endpoint
- **Port**: Runs on localhost:3000

### Data Model
- **Product Entity** (`src/entities/product.entity.ts`): Contains name, description, SKU, price, stock, and supplier relationship
- **Supplier Entity** (`src/entities/supplier.entity.ts`): Contains name, description, contact info, and one-to-many relationship with products
- **Relationship**: Products belong to suppliers (many-to-one)

### Module Structure
Each feature follows NestJS module pattern:
- **Controllers**: Handle HTTP requests and responses (`src/controllers/`)
- **Services**: Business logic and database operations (`src/services/`)
- **Modules**: Feature modules that import TypeORM entities (`src/modules/`)
- **DTOs**: Data transfer objects for validation (`src/dtos/`)

### Database Configuration
- SQLite database file: `database.sqlite` in project root
- TypeORM config: `src/database.config.ts` with synchronization enabled
- Entities are auto-discovered and synced

### Key Features
- Global validation pipes with class-validator
- CORS enabled
- Swagger documentation with tags for products and suppliers
- Timestamp tracking (createdAt, updatedAt) on all entities
- Soft delete capability (isActive field)

### Development Notes
- Uses `@solid-nestjs/rest-api` and `@solid-nestjs/typeorm` packages for additional functionality
- TypeScript configuration allows decorators and has relaxed strict checks
- Database logging is enabled for development