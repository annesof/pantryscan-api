import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ContentUnit } from 'src/contentUnit/contentUnit.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from '../product/product.entity';
import { Location } from 'src/location/location.entity';
import { User } from 'src/user/user.entity';

@ObjectType({ description: 'userProductSettings' })
@Entity()
export class UserProductSettings {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Product, { eager: true, nullable: false })
  @Field()
  product: Product;

  @ManyToOne(() => User, { nullable: false })
  @Field()
  user: User;

  @ManyToOne(() => Location, { eager: true, nullable: false })
  @Field()
  location: Location;

  @ManyToOne(() => ContentUnit, { eager: true, nullable: false })
  @Field()
  contentUnit: ContentUnit;

  @Column({ nullable: true })
  @Field({ nullable: true })
  categoryIds: string;
}
