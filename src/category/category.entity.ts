import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Product } from 'src/product/product.entity';

@ObjectType({ description: 'category ' })
@Entity()
export class Category {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  color?: string;
}
