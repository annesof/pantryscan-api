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
import { FoodService } from 'src/food/food.service';
import { FetchProductsArgs } from './dto/fetch-products.args';
import { Category } from 'src/category/category.entity';

@Resolver(() => Product)
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly foodService: FoodService,
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

  @Query(() => [Product], { name: 'findProducts' })
  findProducts(
    @Args('fetchProductsArgs') fetchProductsArgs: FetchProductsArgs,
  ) {
    if (fetchProductsArgs.categories === 'NO') {
      return this.productService.findProductsWithNoCategory(fetchProductsArgs);
    }

    return this.productService.findProductsByLocationAndCategories(
      fetchProductsArgs,
    );
  }

  @ResolveField(() => [Category])
  async categories(@Parent() product: Product) {
    const { ean } = product;
    return this.categoryService.findByProduct(ean);
  }

  /*@ResolveField(() => [Food])
  async foods(@Parent() product: Product) {
    const { ean } = product;
    return await this.foodService.findByProduct(ean);
  }*/

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
