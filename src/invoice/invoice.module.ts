import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { XeroService } from 'src/util/xero.util';
import { HttpResponse } from 'src/util/response.util';

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService, XeroService, HttpResponse],
})
export class InvoiceModule {}
