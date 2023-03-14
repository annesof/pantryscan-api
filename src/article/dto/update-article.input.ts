import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateArticleInput {
  @Field()
  id: number;

  @Field({ nullable: true })
  expirationDate?: Date;

  @Field()
  quantity: number;
}
