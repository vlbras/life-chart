import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvConfigAdapter } from '@unifig/adapter-env';
import { Config, ConfigContainer, toJSON } from '@unifig/core';
import { getConfigContainerToken } from '@unifig/nest';

import { AppOptions } from './app.options';

import { JwtOptions } from '#auth/jwt.options';

async function bootstrap(): Promise<void> {
  const validationError = await Config.register({
    templates: [AppOptions, JwtOptions],
    adapter: new EnvConfigAdapter(),
  });
  if (validationError) {
    console.error(toJSON(validationError));
    process.exit(1);
  }

  const { AppModule } = await import('./app.module');

  const app = await NestFactory.create(AppModule, { cors: true });
  const config = app.get<ConfigContainer<AppOptions>>(getConfigContainerToken(AppOptions));

  const documentOptions = new DocumentBuilder().setTitle('Life Chart API').setDescription('API description').build();
  const document = SwaggerModule.createDocument(app, documentOptions);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.values.port);
}
bootstrap();
