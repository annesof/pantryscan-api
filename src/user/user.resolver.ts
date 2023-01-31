import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: 'findOneUser' })
  findUserById(@Args('id', { type: () => String }) id: string) {
    return this.userService.findById(id);
  }
}
