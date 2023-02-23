import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { LocationModule } from 'src/location/location.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), LocationModule, ProductModule],
  providers: [ArticleService],
})
export class ArticleModule {}
