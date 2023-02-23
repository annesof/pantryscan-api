import { Module } from '@nestjs/common';

import { ContentUnitService } from './contentUnit.service';
import { ContentUnit } from './contentUnit.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentUnitResolver } from './contentUnit.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ContentUnit])],
  providers: [ContentUnitService, ContentUnitResolver],
  exports: [ContentUnitService],
})
export class ContentUnitModule {}
