import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserProductSettings } from './userProductSettings.entity';
import { CreateUserProductSettingsInput } from './dto/create-user-products-settings.input';
import { ProductUserProductSettingsService } from './ProductUserProductSettings.service';
import { FetchProductsArgs } from 'src/product/dto/fetch-products.args';
import { Product } from 'src/product/product.entity';
import { CreatePersonalProductUserProductSettingsInput } from './dto/create-user-personal-product-settings.input';

@Resolver(() => UserProductSettings)
export class ProductUserProductSettingsResolver {
  constructor(
    private readonly productUserProductSettingsService: ProductUserProductSettingsService, //private readonly productUserProductSettingsService: ProductUserProductSettingsService,
  ) {}

  @Mutation(() => UserProductSettings, { name: 'createUserProductSettings' })
  createProductPreferences(
    @Args('createUserProductSettingsInput')
    createUserProductSettingsInput: CreateUserProductSettingsInput,
  ) {
    return this.productUserProductSettingsService.create(
      createUserProductSettingsInput,
    );
  }

  @Query(() => [Product], { name: 'findProducts' })
  findProducts(
    @Args('fetchProductsArgs') fetchProductsArgs: FetchProductsArgs,
  ) {
    return this.productUserProductSettingsService.findProductsByLocationAndCategories(
      fetchProductsArgs,
    );
  }

  @Mutation(() => UserProductSettings, {
    name: 'createPersonalProductAndPreferences',
  })
  createPersonalProductAndPreferences(
    @Args('createPersonalProductUserProductSettingsInput')
    createPersonalProductUserProductSettingsInput: CreatePersonalProductUserProductSettingsInput,
  ) {
    return this.productUserProductSettingsService.createPersonalProductUser(
      createPersonalProductUserProductSettingsInput,
    );
  }
}
