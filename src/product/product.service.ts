import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { catchError, firstValueFrom } from 'rxjs';

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

  async findOne(ean: string): Promise<Product> {
    if (ean !== 'notfound') {
      const result = await this.productRepository.findOneBy({
        ean,
      });
      if (!result) {
        return this.findExternalProduct(ean);
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

  async findExternalProduct(ean: string): Promise<Product> {
    if (ean && !ean.startsWith('_')) {
      const { data } = await firstValueFrom(
        this.httpService
          .get<any>(
            'https://fr.openfoodfacts.org/api/v0/product/' + ean + '.json',
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
            ean: data.product.code,
            name: data.product.product_name,
            brand: data.product.brands,
            genericName: data.product.generic_name_fr,
            ingredients: data.product.ingredients_text,
            imageUrl: data.product.image_url,
            imageSmallUrl: data.product.image_small_url,
            nutriscoreGrade: data.product.nutriscore_grade,
            quantity: data.product.quantity,
            servingSize: data.product.serving_size,
          };
          await this.create(toSave);
          return toSave;
        }
      } catch (err) {
        console.log('Ohhhh nooo!');
        console.log(err);
      }
    }
  }
}
