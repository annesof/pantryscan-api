import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProductSettings } from './userProductSettings.entity';

@Injectable()
export class UserProductSettingsService {
  constructor(
    @InjectRepository(UserProductSettings)
    private userProductSettingsRepository: Repository<UserProductSettings>,
  ) {}

  async findByProductAndUser(
    ean: string,
    idUser: number,
  ): Promise<UserProductSettings> {
    try {
      return await this.userProductSettingsRepository
        .createQueryBuilder('userProductSettings')
        .leftJoinAndSelect('userProductSettings.location', 'location')
        .leftJoinAndSelect('userProductSettings.product', 'product')
        .leftJoinAndSelect('userProductSettings.contentUnit', 'contentUnit')
        .leftJoinAndSelect('userProductSettings.categories', 'categories')
        .where('userProductSettings.user.id = :idUser', { idUser })
        .andWhere('userProductSettings.product.ean = :ean', { ean })
        .getOneOrFail();
    } catch (error) {
      throw new NotFoundException(
        `UserProductSettings not found for ean ${ean} and idUser ${idUser}`,
      );
    }
  }

  async findByUserAndCategories(
    idUser: number,
    categories: string[],
  ): Promise<UserProductSettings[]> {
    const query = this.userProductSettingsRepository
      .createQueryBuilder('userProductSettings')
      .leftJoinAndSelect('userProductSettings.product', 'product')
      .leftJoinAndSelect('userProductSettings.categories', 'categories');

    if (categories) {
      categories.forEach((categoryId, index) => {
        query.innerJoin(
          `userProductSettings.categories`,
          `category${index}`,
          `category${index}.id = :categoryId${index}`,
          { [`categoryId${index}`]: categoryId },
        );
      });
    }
    return await query
      .andWhere('userProductSettings.user.id = :idUser', { idUser })
      .getMany();
  }
}
