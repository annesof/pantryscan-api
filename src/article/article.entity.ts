import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../product/product.entity';
import { Location } from '../location/location.entity';
import { User } from '../user/user.entity';

@ObjectType({ description: 'article ' })
@Entity()
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

  @ManyToOne(() => User, { eager: true })
  @Field()
  user: User;

  @CreateDateColumn()
  @Field()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
