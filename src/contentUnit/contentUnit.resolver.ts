import { Resolver, Query } from '@nestjs/graphql';
import { ContentUnit } from './contentUnit.entity';
import { ContentUnitService } from './contentUnit.service';

@Resolver(() => ContentUnit)
export class ContentUnitResolver {
  constructor(private readonly contentUnitService: ContentUnitService) {}

  @Query(() => [ContentUnit], { name: 'findAllUnits' })
  findAll() {
    return this.contentUnitService.findAll();
  }
}
