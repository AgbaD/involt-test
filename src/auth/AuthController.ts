import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto';
import { HttpResponse } from 'src/util/response.util';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private response: HttpResponse,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterDto, @Res() res: Response) {
    try {
      const resp = await this.authService.register(dto);
      return this.response.createdResponse(res, resp.message, resp.data);
    } catch (error) {
      return this.response.badRequestResponse(res, error?.message, error?.data);
    }
  }
}
