import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { HttpResponse } from 'src/util/response.util';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';

@Controller('invoice')
@UseGuards(JwtGuard)
@ApiBearerAuth()
@ApiTags('Invoice routes')
export class InvoiceController {
  constructor(
    private invoiceService: InvoiceService,
    private response: HttpResponse,
  ) {}

  @Get('')
  async getInvoices(@Res() res: Response) {
    try {
      const resp = await this.invoiceService.getInvoices();
      return this.response.okResponse(res, resp?.message);
    } catch (error) {
      console.log(error);
      return this.response.badRequestResponse(res, error?.message, error?.data);
    }
  }
}
