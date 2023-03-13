import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SwitchArticleInput {
  @Field()
  id: number;

  @Field()
  idLocation: string;

  @Field()
  quantity: number;
}
