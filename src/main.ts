import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DataBaseCreateService } from './database/servise/data-base-create.service';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

import * as session from 'express-session';
import * as passport from 'passport';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'sdfasdfbsdkfbsdlkafb',
      saveUninitialized: true,
      resave: false,
      cookie: { maxAge: 60000 },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'X-Frame-Options',
    ],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('online-store')
    .setDescription('base URL: "https://online-store-frwk.onrender.com"')
    .setVersion('1.0.1')
    .addBearerAuth()
    .addTag('OS')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () => console.log(`server started on port:${PORT}`));

  const dataBaseCreateService = app.get(DataBaseCreateService);

  await dataBaseCreateService.desertRepositoryInit();
  await dataBaseCreateService.desertTypesRepositoryInit();
  await dataBaseCreateService.adminCreation();
  await dataBaseCreateService.desertFillingRepositoryInit();
  await dataBaseCreateService.desertsFillingCreation();
}
start();
