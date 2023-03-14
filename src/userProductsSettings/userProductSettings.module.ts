import { Module } from '@nestjs/common';

import { UserProductSettings } from './userProductSettings.entity';
import { UserProductSettingsService } from './userProductSettings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProductSettingsResolver } from './userProductSettings.resolver';
import { LocationModule } from 'src/location/location.module';
import { ProductModule } from 'src/product/product.module';
import { ContentUnitModule } from 'src/contentUnit/contentUnit.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserProductSettings]),
    LocationModule,
    ProductModule,
    ContentUnitModule,
  ],
  providers: [UserProductSettingsService, UserProductSettingsResolver],
})
export class UserProductSettingsModule {}
