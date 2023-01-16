import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Product } from 'src/product/product.entity';

@ObjectType({ description: 'category ' })
@Entity()
export class Category {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  color?: string;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Promise<Product[]>;
}
