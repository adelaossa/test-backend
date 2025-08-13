import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { databaseConfig } from './database.config';
import { ProductModule } from './modules/product.module';
import { SupplierModule } from './modules/supplier.module';
import { CustomerModule } from './modules/customer.module';
import { InvoiceModule } from './modules/invoice.module';
import { SeederModule } from './modules/seeder.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      introspection: true,
      csrfPrevention: false,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault({
          footer: false,
          includeCookies: false,
        }),
      ],
      context: ({ req }) => ({ req }),
    }),
    ProductModule,
    SupplierModule,
    CustomerModule,
    InvoiceModule,
    SeederModule,
  ],
})
export class AppModule {}