import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto';
import { Helper } from 'src/util';
import { Profile } from '@prisma/client';
import config from 'src/config';
import { LoginRespDto, RegisterRespDto } from './dto/resp.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async register(dto: RegisterDto): Promise<RegisterRespDto> {
    const tmpProfile = await this.prisma.profile.findFirst({
      where: { email: dto.email },
    });
    if (tmpProfile)
      throw new BadRequestException('Email has already been used');
    if (dto.password !== dto.repeatPassword)
      throw new BadRequestException('Passwords do not match');
    if (!Helper.checkPassword(dto.password))
      throw new BadRequestException('password format is invalid');
    const passwordHash = await argon.hash(dto.password);
    const profile = await this.prisma.profile.create({
      data: {
        email: dto.email,
        password: passwordHash,
        name: dto.fullname,
      },
    });
    delete profile.password;

    return {
      message: 'account created successfully',
      data: { profile },
    };
  }

  async login(dto: LoginDto): Promise<LoginRespDto> {
    const profile = await this.prisma.profile.findFirst({
      where: { email: dto.email },
    });
    if (!profile)
      throw new UnauthorizedException('email or password incorrect.');
    const pwMatch = await argon.verify(profile.password, dto.password);
    if (!pwMatch)
      throw new UnauthorizedException('email or password incorrect.');
    delete profile.password;
    const token = await this.signToken(profile);
    return {
      message: 'login successful',
      data: { profile, token },
    };
  }

  async signToken(profile: Profile): Promise<string> {
    delete profile.password;
    return this.jwt.signAsync(profile, {
      expiresIn: config.jwt.expiresIn,
      secret: config.jwt.secret,
    });
  }
}
