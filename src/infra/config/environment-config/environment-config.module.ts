import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { EnvironmentConfigService } from './environment-config.service';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development')
          .required(),
        MONGODB_URI: Joi.string().required(),
        MONGODB_PORT: Joi.number().default(271017).required(),
      }),
    }),
  ],
  providers: [EnvironmentConfigService],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}
