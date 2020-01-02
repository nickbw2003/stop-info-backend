import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

import { ApplicationModule } from './modules/application.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ApplicationModule);
  app.useStaticAssets(`${__dirname}/public`);
  await app.listen(parseInt(process.env.PORT, 10) || 3000);
}
bootstrap();
