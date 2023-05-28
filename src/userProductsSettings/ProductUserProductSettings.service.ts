import { Injectable } from '@nestjs/common';

import { ProductService } from 'src/product/product.service';

import { Product } from 'src/product/product.entity';
import { FetchProductsArgs } from 'src/product/dto/fetch-products.args';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LocationService } from 'src/location/location.service';
import { CreateUserProductSettingsInput } from './dto/create-user-products-settings.input';
import { UserProductSettings } from './userProductSettings.entity';
import { ContentUnitService } from 'src/contentUnit/contentUnit.service';
import { User } from 'src/user/user.entity';
import { UserProductSettingsService } from './userProductSettings.service';
import { CategoryService } from 'src/category/category.service';
import { CreatePersonalProductUserProductSettingsInput } from './dto/create-user-personal-product-settings.input';
import { CreateProductInput } from 'src/product/dto/create-product.input';
@Injectable()
export class ProductUserProductSettingsService {
  constructor(
    @InjectRepository(UserProductSettings)
    private userProductSettingsRepository: Repository<UserProductSettings>,

    private productService: ProductService,
    private userProductSettingsService: UserProductSettingsService,
    private locationService: LocationService,
    private contentUnitService: ContentUnitService,
    private categoryService: CategoryService,
  ) {}

  async findProductsByLocationAndCategories(
    fetchProductsInput: FetchProductsArgs,
  ): Promise<Product[]> {
    const { withFoods, location, userId, sortBy, skip, take } =
      fetchProductsInput;
    const products = await this.productService.findProductsByLocationAndUser(
      withFoods,
      location,
      userId,
      sortBy,
      skip,
      take,
    );
    const categories =
      fetchProductsInput.categories !== ''
        ? fetchProductsInput.categories.split(',')
        : undefined;

    const userProductSettings =
      await this.userProductSettingsService.findByUserAndCategories(
        fetchProductsInput.userId,
        categories,
      );

    //intersection with categories filters
    const productsIntersect = products.filter((product) =>
      userProductSettings.map((item) => item.product.ean).includes(product.ean),
    );

    return productsIntersect;
  }

  async create(
    createUserProductSettingsInput: CreateUserProductSettingsInput,
  ): Promise<UserProductSettings> {
    const { locationId, productEan, contentUnitId, userId, categoryIds } =
      createUserProductSettingsInput;

    const location = await this.locationService.findOne(locationId);
    const product = await this.productService.findOne(productEan);
    const contentUnit = await this.contentUnitService.findOne(contentUnitId);
    const categories = await this.categoryService.findByIds(
      categoryIds.split(',').map((item) => Number(item)),
    );

    const user = new User();
    user.id = userId;
    const settings = this.userProductSettingsRepository.create({
      ...createUserProductSettingsInput,
      location,
      product,
      contentUnit,
      user,
    });
    settings.categories = categories;

    return this.userProductSettingsRepository.save(settings);
  }

  async createPersonalProductUser(
    createPersonalProductUserProductSettingsInput: CreatePersonalProductUserProductSettingsInput,
  ): Promise<UserProductSettings> {
    const productInput = new CreateProductInput();
    productInput.ean = createPersonalProductUserProductSettingsInput.productEan;
    productInput.idUser = createPersonalProductUserProductSettingsInput.userId;
    productInput.name = createPersonalProductUserProductSettingsInput.name;
    productInput.imageSmallUrl =
      createPersonalProductUserProductSettingsInput.image;
    const product = await this.productService.create(productInput);

    createPersonalProductUserProductSettingsInput.productEan = product.ean;

    return this.create(createPersonalProductUserProductSettingsInput);
  }
}
