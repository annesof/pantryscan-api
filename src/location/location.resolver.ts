import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Location } from './location.entity';
import { LocationService } from './location.service';

@Resolver(() => Location)
export class LocationResolver {
  constructor(private readonly locationService: LocationService) {}

  @Query(() => [Location], { name: 'findAllLocations' })
  findAll() {
    return this.locationService.findAll();
  }

  @Mutation(() => Location)
  updateLocation(@Args('id') id: string, @Args('name') name: string) {
    return this.locationService.update(id, name);
  }

  @Mutation(() => Location)
  createLocation(@Args('id') id: string, @Args('name') name: string) {
    return this.locationService.create({ id, name });
  }
}
