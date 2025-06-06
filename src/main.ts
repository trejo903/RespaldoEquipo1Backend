import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')

  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    transform:true
  }))
    // Le decimos a Express que cuando reciba "application/xml" lo trate como texto plano.
  app.use(bodyParser.text({ type: 'application/xml' }));
  // Si también quieres aceptar "text/xml", agrégalo así:
  app.use(bodyParser.text({ type: 'text/xml' }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
