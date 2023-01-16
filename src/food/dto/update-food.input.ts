import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateFoodInput } from './create-food.input';

@InputType()
export class UpdateFoodInput extends PartialType(CreateFoodInput) {
  @Field()
  id: string;

  @Field()
  started: boolean;
}
