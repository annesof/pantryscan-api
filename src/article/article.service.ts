import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleInput } from './dto/create-article.input';
import { Location } from 'src/location/location.entity';
import { Product } from 'src/product/product.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async create(createArticleInput: CreateArticleInput): Promise<Article> {
    const { eanProduct, idLocation, expirationDate, quantity, idUser } =
      createArticleInput;
    const location = new Location();
    location.id = idLocation;

    const user = new User();
    user.id = idUser;

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
      user,
    });

    return this.articleRepository.save(articleToSave);
  }

  async updateArticle(
    id: number,
    quantity: number,
    expirationDate?: Date | null,
  ): Promise<Article> {
    const article = await this.articleRepository.findOneOrFail({
      where: { id },
    });
    article.quantity = quantity;
    article.expirationDate = expirationDate;
    return this.articleRepository.save(article);
  }

  async switchLocation(
    id: number,
    quantity: number,
    idNewLocation: string,
  ): Promise<Article> {
    const articleToRemove = await this.findArticleWithProduct(id);
    articleToRemove.quantity -= quantity;
    if (articleToRemove.quantity >= 1) {
      await this.articleRepository.save(articleToRemove);
    } else {
      await this.remove(id);
    }
    const articleToUpdate2 = await this.findByProductLocationAndExpirationDate(
      articleToRemove.product.ean,
      idNewLocation,
      articleToRemove.expirationDate,
    );
    if (articleToUpdate2) {
      articleToUpdate2.quantity += quantity;
      return await this.articleRepository.save(articleToUpdate2);
    } else {
      const createArticleInput: CreateArticleInput = {
        eanProduct: articleToRemove.product.ean,
        idLocation: idNewLocation,
        expirationDate: articleToRemove.expirationDate,
        quantity,
        idUser: articleToRemove.user.id,
      };
      return await this.create(createArticleInput);
    }
  }

  async remove(id: number) {
    return await this.articleRepository.delete(id);
  }

  async findByProduct(ean: string): Promise<Article[]> {
    return await this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.location', 'location')
      .where('article.product.ean = :ean', { ean })
      .orderBy({ 'location.id': 'ASC', 'article.expirationDate': 'ASC' })
      .getMany();
  }

  private async findByProductLocationAndExpirationDate(
    ean: string,
    idLocation: string,
    expirationDate?: Date,
  ): Promise<Article> {
    const queryBuilder = this.articleRepository
      .createQueryBuilder('article')
      .leftJoin('article.product', 'product')
      .leftJoin('article.location', 'location')
      .where('product.ean = :ean', { ean })
      .andWhere('location.id = :idLocation', { idLocation });
    if (expirationDate === null || expirationDate === undefined) {
      queryBuilder.andWhere('article.expirationDate IS NULL');
    } else {
      queryBuilder.andWhere('article.expirationDate = :expirationDate', {
        expirationDate,
      });
    }

    return await queryBuilder.getOne();
  }

  private async findArticleWithProduct(id: number): Promise<Article> {
    return await this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.product', 'product')
      .where('article.id = :id', { id })
      .getOne();
  }
}
