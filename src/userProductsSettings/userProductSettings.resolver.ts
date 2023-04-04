import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserProductSettings } from './userProductSettings.entity';
import { UserProductSettingsService } from './userProductSettings.service';

@Resolver(() => UserProductSettings)
export class UserProductSettingsResolver {
  constructor(
    private readonly userProductSettingsService: UserProductSettingsService, //private readonly productUserProductSettingsService: ProductUserProductSettingsService,
  ) {}

  @Query(() => UserProductSettings, { name: 'findByProductAndUser' })
  findByProductAndUser(
    @Args('idUser', { type: () => Number }) idUser: number,
    @Args('ean', { type: () => String }) ean: string,
  ) {
    return this.userProductSettingsService.findByProductAndUser(ean, idUser);
  }
}
