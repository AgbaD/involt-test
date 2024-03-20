import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { HttpResponse } from 'src/util/response.util';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { GetProfile } from 'src/auth/decorator';
import { Profile } from '@prisma/client';

@Controller('invoice')
@UseGuards(JwtGuard)
@ApiBearerAuth()
@ApiTags('Invoice routes')
export class InvoiceController {
  constructor(
    private invoiceService: InvoiceService,
    private response: HttpResponse,
  ) {}

  @Get('/all/:code')
  async getInvoices(
    @GetProfile() profile: Profile,
    @Res() res: Response,
    @Param('code') code: string,
  ) {
    try {
      const resp = await this.invoiceService.connectXero(code);
      return this.response.okResponse(res, resp?.message);
    } catch (error) {
      return this.response.badRequestResponse(res, error?.message, error?.data);
    }
  }
}
