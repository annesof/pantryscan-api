import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { catchError, firstValueFrom } from 'rxjs';
import { FetchProductsArgs } from './dto/fetch-products.args';

const FIELDS = {
  DATE: { field: 'food.createdDate', asc: false },
  NAME: { field: 'product.name', asc: true },
  BRAND: { field: 'product.brand', asc: true },
};

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private readonly httpService: HttpService,
  ) {}

  async create(createProductInput: CreateProductInput): Promise<Product> {
    const product = this.productRepository.create(createProductInput);
    return this.productRepository.save(product);
  }

  async findOne(ean: string): Promise<Product | { ean: string; name: string }> {
    if (ean !== 'notfound') {
      const result = await this.productRepository.findOneBy({
        ean,
      });
      if (!result) {
        return this.findAndCreateExternalProduct(ean);
      }
      return result;
    }
  }

  async findProductsByCategories(categories: string): Promise<Product[]> {
    //const filters = categories.split(',');
    const result = await this.productRepository
      .createQueryBuilder('product')
      .innerJoin('product.categories', 'category')
      .where('category.id in (:name)', { name: categories })
      .getMany();
    return result;
  }

  private async findAndCreateExternalProduct(
    ean: string,
  ): Promise<Product | { ean: string; name: string }> {
    if (ean && !ean.startsWith('_')) {
      const { data } = await firstValueFrom(
        this.httpService
          .get<any>(
            'https://fr.openfoodfacts.org/api/v2/product/' +
              ean +
              '?fields=quantity,product_name,brands,generic_name_fr,nutriscore_grade,image_front_small_url,image_front_thumb_url',
            {
              headers: { 'User-Agent': 'PantryScan - Web - Version 0.1_alpha' },
            },
          )
          .pipe(
            catchError(() => {
              //this.logger.error(error.response.data);
              throw 'An error happened!';
            }),
          ),
      );
      try {
        if (data.status === 0 || data.product.code === '') {
          return { ean: data.code, name: 'notfound' };
        } else {
          const toSave = {
            ean: data.code,
            name: data.product.product_name,
            brand: data.product.brands,
            genericName: data.product.generic_name_fr,
            //ingredients: data.product.ingredients_text,
            imageUrl: data.product.image_front_small_url,
            imageSmallUrl: data.product.image_front_thumb_url,
            nutriscoreGrade: data.product.nutriscore_grade,
            quantity: data.product.quantity,
            //servingSize: data.product.serving_size,
          };
          const created = await this.create(toSave);
          created.newlyAdded = true;
          return created;
        }
      } catch (err) {
        console.log('Ohhhh nooo!');
        console.log(err);
      }
    }
  }

  async findProductsByLocationAndCategories(
    fetchProductsInput: FetchProductsArgs,
  ): Promise<Product[]> {
    let query = this.productRepository.createQueryBuilder('product');

    fetchProductsInput.withFoods
      ? query.innerJoinAndSelect('product.foods', 'food')
      : query.leftJoinAndSelect('product.foods', 'food');

    query.leftJoinAndSelect('food.location', 'location');
    if (fetchProductsInput.categories) {
      fetchProductsInput.categories?.split(',').forEach((categoryId, index) => {
        query = query
          .innerJoin(
            `product.categories`,
            `category${index}`,
            `category${index}.id = :categoryId${index}`,
            { [`categoryId${index}`]: categoryId },
          )
          .where(
            `${fetchProductsInput.categories
              ?.split(',')
              .map((_, index) => `category${index}.id = :categoryId${index}`)
              .join(' AND ')}`,
          );
      });
    }

    return await query
      .andWhere(
        fetchProductsInput.location ? 'location.id = (:locationId)' : '1=1',
        {
          locationId: fetchProductsInput.location,
        },
      )
      .orderBy(
        FIELDS[fetchProductsInput.sortBy].field,
        FIELDS[fetchProductsInput.sortBy].asc ? 'ASC' : 'DESC',
      )
      .skip(fetchProductsInput.skip)
      .take(fetchProductsInput.take)
      .getMany();
    /*return await this.productRepository
      .createQueryBuilder('product')
      .leftJoin('product.categories', 'category')
      .leftJoinAndSelect('product.foods', 'food')
      .leftJoinAndSelect('food.location', 'location')
      .where(
        fetchProductsInput.categories ? 'category.id IN (:...ids)' : '1=1',
        {
          ids: fetchProductsInput.categories?.split(',').map(Number),
        },
      )
      .andWhere(
        fetchProductsInput.location ? 'location.id = (:locationId)' : '1=1',
        {
          locationId: fetchProductsInput.location,
        },
      )
      .skip(fetchProductsInput.skip)
      .take(fetchProductsInput.take)
      .orderBy('food.createdDate', 'DESC')
      .getMany();*/
  }

  async findProductsWithNoCategory(
    fetchProductsInput: FetchProductsArgs,
  ): Promise<Product[]> {
    return await this.productRepository
      .createQueryBuilder('product')
      .leftJoin('product.categories', 'category')
      .leftJoinAndSelect('product.foods', 'food')
      .leftJoinAndSelect('food.location', 'location')
      .where('category.id IS NULL')
      .andWhere(
        fetchProductsInput.location ? 'location.id = (:locationId)' : '1=1',
        {
          locationId: fetchProductsInput.location,
        },
      )
      .skip(fetchProductsInput.skip)
      .take(fetchProductsInput.take)
      .getMany();
  }
}
