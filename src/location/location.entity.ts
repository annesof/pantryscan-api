import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType({ description: 'Location ' })
@Entity()
export class Location {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Column()
  @Field()
  name: string;
}
