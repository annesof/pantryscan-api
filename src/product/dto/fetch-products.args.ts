import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class FetchProductsArgs {
  @Field(() => Int)
  skip = 0;

  @Field(() => Int)
  take = 10;

  @Field({ nullable: true })
  categories?: string = undefined;

  @Field({ nullable: true })
  location?: string = undefined;

  @Field({ nullable: true })
  withFoods?: boolean = false;

  @Field({ nullable: true })
  sortBy?: string = 'NAME';
}
