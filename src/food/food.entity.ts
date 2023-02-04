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

@ObjectType({ description: 'food ' })
@Entity()
export class Food {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  expirationDate?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  started?: boolean;

  @ManyToOne(() => Product, (product) => product.foods)
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
