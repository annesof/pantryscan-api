import { Module } from '@nestjs/common';

import { UserProductSettings } from './userProductSettings.entity';
import { UserProductSettingsService } from './userProductSettings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProductSettingsResolver } from './userProductSettings.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserProductSettings])],
  providers: [UserProductSettingsService, UserProductSettingsResolver],
  exports: [UserProductSettingsService],
})
export class UserProductSettingsModule {}
