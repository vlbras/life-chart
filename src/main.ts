import { NestFactory } from '@nestjs/core';
import { EnvConfigAdapter } from '@unifig/adapter-env';
import { Config, ConfigContainer } from '@unifig/core';
import { getConfigContainerToken } from '@unifig/nest';

import { AppOptions } from './app.options';

async function bootstrap(): Promise<void> {
  await Config.register({
    template: AppOptions,
    adapter: new EnvConfigAdapter(),
  });

  const { AppModule } = await import('./app.module');

  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigContainer<AppOptions>>(getConfigContainerToken(AppOptions));

  await app.listen(config.values.port);
}
bootstrap();
