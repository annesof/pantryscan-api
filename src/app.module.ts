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
import databaseConf from 'database.conf';
import { ProductUserProductSettingsModule } from './userProductsSettings/ProductUserProductSettings.module';
@Module({
  imports: [
    ConfigModule.forRoot({ load: [databaseConf] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log(
          `postgres://${configService.get('db.username')}:${configService.get(
            'db.password',
          )}@${configService.get('db.host')}:5432/${configService.get(
            'db.name',
          )}`,
        );
        return {
          name: 'default',
          type: 'postgres',
          logging: true,
          url: `postgres://${configService.get(
            'db.username',
          )}:${configService.get('db.password')}@${configService.get(
            'db.host',
          )}:5432/${configService.get('db.name')}`,
          autoLoadEntities: true,
          synchronize: true,
          migrations: ['dist/src/migrations/*{.ts,.js}'],
          migrationsRun: true,
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      cors: {
        origin: 'http://localhost:5173',
        credentials: true,
      },
      playground: true,
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
      sortSchema: true,
    }),
    LocationModule,
    ContentUnitModule,
    CategoryModule,
    UserModule,
    ProductModule,
    ArticleModule,
    UserProductSettingsModule,
    ProductUserProductSettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
