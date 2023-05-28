import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { catchError, firstValueFrom } from 'rxjs';
import { User } from 'src/user/user.entity';

const FIELDS = {
  DATE: { field: 'article.createdDate', asc: false },
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
    const user = new User();
    user.id = createProductInput.idUser;
    const product = this.productRepository.create({
      ...createProductInput,
      user,
    });
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

  async findPersonalProducts(idUser: number): Promise<Product[]> {
    if (idUser) {
      const products = await this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.user', 'user')
        .andWhere('user.id = (:idUser)', {
          idUser,
        })
        .orderBy('product.name', 'ASC')
        .getMany();
      return products;
    }
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

  async findProductsByLocationAndUser(
    withFoods: boolean,
    locationId: string,
    userId: number,
    sortBy: string,
    skip: number,
    take: number,
  ): Promise<Product[]> {
    const query = this.productRepository.createQueryBuilder('product');

    withFoods
      ? query.innerJoinAndSelect('product.articles', 'article')
      : query.leftJoinAndSelect('product.articles', 'article');

    query.leftJoinAndSelect('article.location', 'location');
    query.leftJoinAndSelect('article.user', 'user');
    query.leftJoinAndSelect(
      'product.userProductSettings',
      'userProductSettings',
    );

    return await query
      .andWhere(locationId ? 'location.id = (:locationId)' : '1=1', {
        locationId,
      })
      .andWhere('user.id = :userId', {
        userId,
      })

      .orderBy(FIELDS[sortBy].field, FIELDS[sortBy].asc ? 'ASC' : 'DESC')
      .skip(skip)
      .take(take)
      .getMany();
  }
}
