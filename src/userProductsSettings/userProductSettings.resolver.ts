import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserProductSettings } from './userProductSettings.entity';
import { UserProductSettingsService } from './userProductSettings.service';
import { CreateUserProductSettingsInput } from './dto/create-user-products-settings.input';

@Resolver(() => UserProductSettings)
export class UserProductSettingsResolver {
  constructor(
    private readonly userProductSettingsService: UserProductSettingsService,
  ) {}

  @Query(() => UserProductSettings, { name: 'findByProductAndUser' })
  findByProductAndUser(
    @Args('idUser', { type: () => Number }) idUser: number,
    @Args('ean', { type: () => String }) ean: string,
  ) {
    return this.userProductSettingsService.findByProductAndUser(ean, idUser);
  }

  @Mutation(() => UserProductSettings, { name: 'createUserProductSettings' })
  createProductPreferences(
    @Args('createUserProductSettingsInput')
    createUserProductSettingsInput: CreateUserProductSettingsInput,
  ) {
    return this.userProductSettingsService.create(
      createUserProductSettingsInput,
    );
  }
}
