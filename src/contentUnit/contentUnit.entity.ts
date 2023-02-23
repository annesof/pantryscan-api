import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({ description: 'content_unit' })
@Entity()
export class ContentUnit {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @Field()
  name: string;
}
