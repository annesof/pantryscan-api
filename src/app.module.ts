import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ArticleModule } from './article/article.module';
import { CategoryModule } from './category/category.module';
import { LocationModule } from './location/location.module';
import { ContentUnitModule } from './contentUnit/contentUnit.module';
import { UserModule } from './user/user.module';
import { UserProductSettingsModule } from './userProductsSettings/userProductSettings.module';

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
          autoLoadEntities: true,
          /*entities: [
            __dirname + '/contentUnit/contentUnit.entity.ts',
            __dirname + '/category/category.entity.ts',
            __dirname + '/location/location.entity.ts',
            __dirname + '/article/article.entity.ts',
            __dirname + '/product/product.entity.ts',
            __dirname + '/user/user.entity.ts',
          ],*/
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
    LocationModule,
    ContentUnitModule,
    CategoryModule,
    UserModule,
    ProductModule,
    ArticleModule,
    UserProductSettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
