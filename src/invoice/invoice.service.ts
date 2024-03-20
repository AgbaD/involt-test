import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { XeroService } from 'src/util/xero.util';

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService, private xero: XeroService) {}

  async connectXero(code: string) {
    const accessToken = await this.xero.getAccessTokenAC(code);
    // const invoices = await this.xero.getAccessTokenCC();
    console.log(accessToken);
    return {
      message: 'retrieved',
    };
  }
}
