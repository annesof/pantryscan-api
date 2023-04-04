import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ContentUnit } from 'src/contentUnit/contentUnit.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Product } from '../product/product.entity';
import { Location } from 'src/location/location.entity';
import { User } from 'src/user/user.entity';
import { Category } from 'src/category/category.entity';

@ObjectType({ description: 'userProductSettings' })
@Entity()
export class UserProductSettings {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Product, {
    eager: true,
    nullable: false,
  })
  @Field(() => Product)
  product: Product;

  @ManyToOne(() => User, { nullable: false })
  @Field(() => User)
  user: User;

  @ManyToOne(() => Location, { eager: true, nullable: false })
  @Field()
  location: Location;

  @ManyToOne(() => ContentUnit, { eager: true, nullable: false })
  @Field()
  contentUnit: ContentUnit;

  @ManyToMany(() => Category, { eager: true })
  @JoinTable()
  @Field(() => [Category], { nullable: true })
  categories?: Category[];

  /*@Column({ nullable: true })
  categoryIds: string;*/

  /*@Field(() => [String])
  get categories(): string[] {
    return this.categoryIds.split(',');
  }*/
}
