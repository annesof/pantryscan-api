import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './food.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Food])],
  providers: [FoodService],
  exports: [FoodService],
})
export class FoodModule {}
