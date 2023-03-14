import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserProductSettingsInput {
  @Field()
  userId: number;

  @Field()
  productEan: string;

  @Field()
  locationId: string;

  @Field()
  contentUnitId: number;

  @Field()
  categoryIds: string;
}
