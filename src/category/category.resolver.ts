import { Resolver, Query } from '@nestjs/graphql';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category], { name: 'findAllCategories' })
  findAll() {
    console.log('totoi');
    return this.categoryService.findAll();
  }
}
