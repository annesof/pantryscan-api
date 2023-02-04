import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Category } from '../category/category.entity';

@ObjectType({ description: 'user ' })
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  firstName?: string;

  @ManyToMany(() => Category, { eager: true })
  @JoinTable()
  @Field(() => [Category], { nullable: true })
  favoriteCategories?: Category[];
}
