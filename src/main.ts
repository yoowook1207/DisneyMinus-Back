import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('MoviesBackend')
    .setDescription('Backend for Disney Minus')
    .setVersion('2.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port = 4231;

  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();
