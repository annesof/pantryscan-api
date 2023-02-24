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
import { FetchProductsArgs } from './dto/fetch-products.args';
import { Article } from 'src/article/article.entity';
import { ArticleService } from 'src/article/article.service';

@Resolver(() => Product)
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly articleService: ArticleService,
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

  @ResolveField(() => [Article])
  async articles(@Parent() product: Product) {
    const { ean } = product;
    return await this.articleService.findByProduct(ean);
  }
}
