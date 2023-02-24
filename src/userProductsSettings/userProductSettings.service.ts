import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProductSettings } from './userProductSettings.entity';
import { LocationService } from 'src/location/location.service';
import { ProductService } from 'src/product/product.service';
import { ContentUnitService } from 'src/contentUnit/contentUnit.service';

import { CreateUserProductSettingsInput } from './dto/create-user-products-settings.input';
import { User } from 'src/user/user.entity';

@Injectable()
export class UserProductSettingsService {
  constructor(
    @InjectRepository(UserProductSettings)
    private userProductSettingsRepository: Repository<UserProductSettings>,
    private locationService: LocationService,
    private productService: ProductService,
    private contentUnitService: ContentUnitService,
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
        .where('userProductSettings.user.id = :idUser', { idUser })
        .andWhere('userProductSettings.product.ean = :ean', { ean })
        .getOneOrFail();
    } catch (error) {
      throw new NotFoundException(
        `UserProductSettings not found for ean ${ean} and idUser ${idUser}`,
      );
    }
  }

  async create(
    createUserProductSettingsInput: CreateUserProductSettingsInput,
  ): Promise<UserProductSettings> {
    const location = await this.locationService.findOne(
      createUserProductSettingsInput.locationId,
    );
    const product = await this.productService.findOne(
      createUserProductSettingsInput.productEan,
    );

    const contentUnit = await this.contentUnitService.findOne(
      createUserProductSettingsInput.contentUnitId,
    );

    const user = new User();
    user.id = createUserProductSettingsInput.userId;
    const settings = this.userProductSettingsRepository.create({
      ...createUserProductSettingsInput,
      location,
      product,
      contentUnit,
      user,
    });

    return this.userProductSettingsRepository.save(settings);
  }
}
