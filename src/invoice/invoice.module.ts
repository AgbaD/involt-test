import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { HttpResponse } from 'src/util/response.util';

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService, HttpResponse],
})
export class InvoiceModule {}
