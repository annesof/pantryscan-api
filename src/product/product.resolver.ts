import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './product.entity';

import { Article } from 'src/article/article.entity';
import { ArticleService } from 'src/article/article.service';

@Resolver(() => Product)
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly articleService: ArticleService, //private readonly productUserProductSettingsService: ProductUserProductSettingsService,
  ) {}

  /* @Mutation(() => Product, { name: 'createProduct' })
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productService.create(createProductInput);
  }*/

  @Query(() => Product, { name: 'findOneProduct' })
  findOne(@Args('ean', { type: () => String }) id: string) {
    return this.productService.findOne(id);
  }

  @Query(() => [Product], { name: 'findPersonalProducts' })
  findPersonalProducts(@Args('idUser', { type: () => Number }) idUser: number) {
    return this.productService.findPersonalProducts(idUser);
  }

  @ResolveField(() => [Article])
  async articles(@Parent() product: Product) {
    const { ean } = product;
    return await this.articleService.findByProduct(ean);
  }
}
