import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { Product } from '../product/product.entity';
import { Location } from '../location/location.entity';

@ObjectType({ description: 'article ' })
@Entity()
/*@Index('article_unique', ['product', 'location', 'expirationDate'], {
  unique: true,
  where:
    '((expirationDate IS NULL) OR (expirationDate IS NOT NULL AND (productEAN, locationId, expirationDate) NOT IN (SELECT productEAN, locationId, expirationDate FROM article WHERE expirationDate IS NOT NULL)))',
})*/
@Unique(['expirationDate', 'location', 'product'])
export class Article {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  expirationDate?: Date;

  @Column()
  @Field()
  quantity: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  started?: boolean = false;

  @ManyToOne(() => Product, (product) => product.articles)
  @Field(() => Product)
  product: Product;

  @ManyToOne(() => Location, { eager: true })
  @Field()
  location: Location;

  @CreateDateColumn()
  @Field()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
