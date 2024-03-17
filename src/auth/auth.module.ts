import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './AuthController';
import { JwtService } from '@nestjs/jwt';
import { HttpResponse } from 'src/util/response.util';

@Module({
  providers: [AuthService, JwtService, HttpResponse],
  controllers: [AuthController],
})
export class AuthModule {}
