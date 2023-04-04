import { Module } from '@nestjs/common';

import { UserProductSettings } from './userProductSettings.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationModule } from 'src/location/location.module';
import { ProductModule } from 'src/product/product.module';
import { ContentUnitModule } from 'src/contentUnit/contentUnit.module';
import { UserProductSettingsModule } from './userProductSettings.module';
import { ProductUserProductSettingsService } from './ProductUserProductSettings.service';
import { ProductUserProductSettingsResolver } from './ProductUserProductSettings.resolver';
import { CategoryModule } from 'src/category/category.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserProductSettings]),
    LocationModule,
    ProductModule,
    ContentUnitModule,
    UserProductSettingsModule,
    CategoryModule,
  ],
  providers: [
    ProductUserProductSettingsService,
    ProductUserProductSettingsResolver,
  ],
})
export class ProductUserProductSettingsModule {}
