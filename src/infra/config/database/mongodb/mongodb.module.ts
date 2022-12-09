import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentConfigModule } from 'src/infra/config/environment-config/environment-config.module';
import { EnvironmentConfigService } from 'src/infra/config/environment-config/environment-config.service';

export const getMongodbModule = (config: EnvironmentConfigService) => ({
  uri: config.getDatabaseUri(),
});
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getMongodbModule,
    }),
  ],
})
export class MongodbModule {}
