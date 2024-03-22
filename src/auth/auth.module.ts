import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { HttpResponse } from 'src/util';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import config from 'src/config';
import { JwtStrategy } from './strategy';
import { XeroService } from 'src/util/xero.util';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: config.jwt.secret,
      signOptions: { expiresIn: parseInt(config.jwt.expiresIn) },
    }),
  ],
  providers: [AuthService, JwtStrategy, HttpResponse, XeroService],
  controllers: [AuthController],
})
export class AuthModule {}
