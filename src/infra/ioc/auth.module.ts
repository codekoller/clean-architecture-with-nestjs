import { AuthController } from '@app/presentation/controllers/auth/auth.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AuthController],
})
export class AuthModule {}
