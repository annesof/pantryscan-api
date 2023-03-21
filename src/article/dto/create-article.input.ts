import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateArticleInput {
  @Field()
  eanProduct: string;

  @Field()
  idLocation: string;

  @Field({ nullable: true })
  expirationDate?: Date;

  @Field()
  quantity: number;

  @Field()
  idUser: number;
}
