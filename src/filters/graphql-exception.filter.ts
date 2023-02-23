import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';

@Catch(HttpException)
export class GraphQLErrorFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const error = exception.getResponse();
    const statusCode = exception.getStatus();
    if (typeof error === 'string') {
      return new ApolloError(error, `${statusCode}`);
    } else if (typeof error === 'object') {
      const formattedErrors = [];
      for (const key in error) {
        if (error.hasOwnProperty(key)) {
          formattedErrors.push({
            message: error[key],
            path: gqlHost.getInfo().path,
          });
        }
      }
      return new ApolloError(formattedErrors[0].message, `${statusCode}`, {
        errors: formattedErrors,
      });
    }
  }
}
