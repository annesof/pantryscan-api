import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleInput } from './dto/create-article.input';
import { Location } from 'src/location/location.entity';
import { Product } from 'src/product/product.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async create(createArticleInput: CreateArticleInput): Promise<Article> {
    const { eanProduct, idLocation, expirationDate, quantity } =
      createArticleInput;
    const location = new Location();
    location.id = idLocation;

    const product = new Product();
    product.ean = eanProduct;
    const article = new Article();
    article.expirationDate = expirationDate
      ? new Date(expirationDate)
      : undefined;
    article.quantity = quantity;

    const articleToSave = this.articleRepository.create({
      ...article,
      location,
      product,
    });

    return this.articleRepository.save(articleToSave);
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
      .leftJoinAndSelect('article.location', 'location')
      .where('article.product.ean = :ean', { ean })
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
