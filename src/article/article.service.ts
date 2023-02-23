import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleInput } from './dto/create-article.input';
import { LocationService } from 'src/location/location.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    private locationService: LocationService,
    private productService: ProductService,
  ) {}

  async create(createArticleInput: CreateArticleInput): Promise<Article> {
    const { eanProduct, idLocation, expirationDate, quantity } =
      createArticleInput;

    const location = await this.locationService.findOne(idLocation);
    const product = await this.productService.findOne(eanProduct);

    if (!product) {
      throw new Error('Product not found');
    }

    if (!location) {
      throw new Error('Location not found');
    }

    const article = new Article();
    article.expirationDate = expirationDate
      ? new Date(expirationDate)
      : undefined;
    article.quantity = quantity;
    article.product = product;
    article.location = location;

    return this.articleRepository.save(article);
  }

  async updateQuantity(id: number, quantity?: number): Promise<Article> {
    const article = await this.articleRepository.findOneOrFail({
      where: { id },
    });
    article.quantity = quantity;
    return this.articleRepository.save(article);
  }

  async switchLocation(
    id: number,
    quantity: number,
    idNewLocation: string,
  ): Promise<void> {
    const articleToRemove = await this.articleRepository.findOneOrFail({
      where: { id },
    });
    articleToRemove.quantity -= quantity;
    await this.articleRepository.save(articleToRemove);
    const articleToUpdate2 = await this.findByProductLocationAndExpirationDate(
      articleToRemove.product.ean,
      idNewLocation,
      articleToRemove.expirationDate,
    );
    if (articleToUpdate2) {
      articleToUpdate2.quantity += quantity;
      await this.articleRepository.save(articleToUpdate2);
    } else {
      const createArticleInput: CreateArticleInput = {
        eanProduct: articleToRemove.product.ean,
        idLocation: idNewLocation,
        expirationDate: articleToRemove.expirationDate,
        quantity,
      };
      await this.create(createArticleInput);
    }
  }

  async remove(id: number) {
    await this.articleRepository.delete(id);
  }

  async findByProduct(ean: string): Promise<Article[]> {
    return await this.articleRepository
      .createQueryBuilder('article')
      .where('product.ean = :ean', { ean })
      .getMany();
  }

  private async findByProductLocationAndExpirationDate(
    ean: string,
    idLocation: string,
    expirationDate?: Date,
  ): Promise<Article> {
    return await this.articleRepository
      .createQueryBuilder('article')
      .where('product.ean = :ean', { ean })
      .andWhere('location.id = :idLocation', { idLocation })
      .andWhere('expirationDate = :expirationDate', { expirationDate })
      .getOne();
  }
}
