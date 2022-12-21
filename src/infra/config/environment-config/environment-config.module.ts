import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { EnvironmentConfigService } from './environment-config.service';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        APP_URL: Joi.string().required(),
        PORT: Joi.number().required(),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development')
          .required(),
        JWT_SECRET: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
        MONGODB_PORT: Joi.number().default(27017).required(),
        NGINX_PORT: Joi.number().default(80).required(),
        DEFAULT_STRATEGY: Joi.string().required(),
        PROPERTY: Joi.string().required(),
        SESSION: Joi.boolean().default(false).required(),
      }),
    }),
  ],
  providers: [EnvironmentConfigService],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}
