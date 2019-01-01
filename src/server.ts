import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

import { ApplicationModule } from './modules/application.module';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  await app.listen(parseInt(process.env.PORT, 10) || 3000);
}
bootstrap();
