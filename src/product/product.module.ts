import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { HttpModule } from '@nestjs/axios';
import { CategoryModule } from 'src/category/category.module';
import { FoodModule } from 'src/food/food.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    CategoryModule,
    HttpModule,
    FoodModule,
  ],
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}
