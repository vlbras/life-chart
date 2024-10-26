import { NestFactory } from '@nestjs/core';
import { EnvConfigAdapter } from '@unifig/adapter-env';
import { Config, toJSON } from '@unifig/core';

import { AppOptions } from '../app.options';
import { SeedOptions } from './seed.options';
import { SeedService } from './seed.service';

async function bootstrap(): Promise<void> {
  const validationError = await Config.register({
    templates: [AppOptions, SeedOptions],
    adapter: new EnvConfigAdapter(),
  });
  if (validationError) {
    console.error(toJSON(validationError));
    process.exit(1);
  }

  const { DatabaseModule } = await import('./database.module');

  const appContext = await NestFactory.createApplicationContext(DatabaseModule);
  const seedService = appContext.get(SeedService);

  try {
    await seedService.seedUsers();
    console.log('User data seeded successfully.');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await appContext.close();
    process.exit();
  }
}

bootstrap();
