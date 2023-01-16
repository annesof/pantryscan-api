import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  ean: string;

  @Field()
  name: string;

  @Field()
  brand: string;

  @Field()
  genericName: string;

  @Field()
  ingredients?: string;

  @Field()
  imageUrl: string;

  @Field()
  imageSmallUrl: string;

  @Field()
  nutriscoreGrade?: string;

  @Field()
  quantity?: string;

  @Field()
  servingSize?: string;
}
