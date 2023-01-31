import { Resolver, Query } from '@nestjs/graphql';
import { Location } from './location.entity';
import { LocationService } from './location.service';

@Resolver(() => Location)
export class LocationResolver {
  constructor(private readonly locationService: LocationService) {}

  @Query(() => [Location], { name: 'findAllLocations' })
  findAll() {
    return this.locationService.findAll();
  }
}
