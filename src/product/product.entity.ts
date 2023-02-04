import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  PrimaryColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { Food } from '../food/food.entity';

@ObjectType({ description: 'product ' })
@Entity()
export class Product {
  @Field(() => ID)
  @PrimaryColumn()
  ean: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  brand?: string;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  genericName?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  ingredients?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  nutriscoreGrade?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  imageUrl?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  imageSmallUrl?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  quantity?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  servingSize?: string;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable()
  @Field(() => [Category], { nullable: true }) //important to be array
  categories?: Category[];

  @OneToMany(() => Food, (food) => food.product, { eager: true })
  @Field(() => [Food], { nullable: true })
  foods?: Food[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
