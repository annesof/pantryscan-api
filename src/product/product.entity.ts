import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Article } from '../article/article.entity';
import { UserProductSettings } from 'src/userProductsSettings/userProductSettings.entity';
import { User } from 'src/user/user.entity';
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

  @OneToMany(() => Article, (food) => food.product, { eager: true })
  @Field(() => [Article], { nullable: true })
  articles?: Article[];

  @CreateDateColumn()
  createdDate?: Date;

  @UpdateDateColumn()
  updatedDate?: Date;

  @Field({ defaultValue: false })
  newlyAdded?: boolean;

  @OneToMany(() => UserProductSettings, (settings) => settings.product)
  @Field(() => [UserProductSettings], { nullable: true })
  userProductSettings?: UserProductSettings[];

  @ManyToOne(() => User, { eager: true })
  @Field()
  user?: User;
}
