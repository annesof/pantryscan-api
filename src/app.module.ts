import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { FoodModule } from './food/food.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          name: 'default',
          type: 'postgres',
          logging: true,
          url: configService.get('DATABASE_URL'),
          entities: [__dirname + '/**/**.entity{.ts,.js}'],
          migrations: ['dist/src/migrations/*{.ts,.js}'],
          synchronize: true,
          migrationsRun: true,
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      playground: true,
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    ProductModule,
    FoodModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
