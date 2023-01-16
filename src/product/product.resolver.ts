import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { CategoryService } from 'src/category/category.service';

@Resolver(() => Product)
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  @Mutation(() => Product, { name: 'createProduct' })
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productService.create(createProductInput);
  }

  @Query(() => Product, { name: 'findOneProduct' })
  findOne(@Args('ean', { type: () => String }) id: string) {
    return this.productService.findOne(id);
  }

  @Query(() => [Product], { name: 'findProductByCategories' })
  findProductByCategories(
    @Args('categories', { type: () => String }) categories: string,
  ) {
    return this.productService.findProductsByCategories(categories);
  }

  @ResolveField()
  async categories(@Parent() product: Product) {
    const { ean } = product;
    return this.categoryService.findByProduct(ean);
  }

  /* @Mutation(() => Employee)
  updateEmployee(
    @Args('updateEmployeeInput') updateEmployeeInput: UpdateEmployeeInput,
  ) {
    return this.productService.update(
      updateEmployeeInput.id,
      updateEmployeeInput,
    );
  }

  @Mutation(() => Employee)
  removeEmployee(@Args('id', { type: () => Int }) id: number) {
    return this.productService.remove(id);
  }*/
}
