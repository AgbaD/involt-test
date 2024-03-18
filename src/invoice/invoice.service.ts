import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { XeroService } from 'src/util/xero.util';

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService, private xero: XeroService) {}

  async getInvoices() {
    const invoices = await this.xero.getTokenSet();
    console.log(invoices);
    return {
      message: 'retrieved',
    };
  }
}
