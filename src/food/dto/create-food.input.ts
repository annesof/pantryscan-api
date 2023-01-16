import { InputType, Field } from '@nestjs/graphql';
import { Location } from '../../location/location.entity';

@InputType()
export class CreateFoodInput {
  @Field()
  eanProduct: string;

  @Field()
  location: Location;

  @Field()
  expirationDate: string;

  @Field({ nullable: true })
  packaging: string;
}
