import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateLocationInput {
  @Field()
  id: string;

  @Field()
  name: string;
}
