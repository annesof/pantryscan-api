import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  ean: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  brand?: string;

  @Field({ nullable: true })
  genericName?: string;

  @Field({ nullable: true })
  ingredients?: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field()
  imageSmallUrl: string;

  @Field({ nullable: true })
  nutriscoreGrade?: string;

  @Field({ nullable: true })
  quantity?: string;

  @Field({ nullable: true })
  servingSize?: string;

  @Field({ nullable: true })
  idUser?: number;
}
