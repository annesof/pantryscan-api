import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationResolver } from './location.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location]), LocationModule],
  providers: [LocationResolver, LocationService],
  exports: [LocationService],
})
export class LocationModule {}
