import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
//import { AppController } from './app.controller';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

/*@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})*/

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
    }),
  ],
})
export class AppModule {}
