import { InputType, Field } from '@nestjs/graphql';
import { CreateUserProductSettingsInput } from './create-user-products-settings.input';

@InputType()
export class CreatePersonalProductUserProductSettingsInput extends CreateUserProductSettingsInput {
  @Field()
  name: string;

  @Field()
  image: string;
}
