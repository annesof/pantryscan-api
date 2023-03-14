import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TypeORMExceptionFilter } from './filters/typeorm-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new TypeORMExceptionFilter());
  await app.listen(3000);
}
bootstrap();
