import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}

  async getInvoices(profileId: number) {
    const profile = await this.prisma.profile.findFirst({
      where: { id: profileId },
    });
    if (!profile) throw new NotFoundException('profile not found');
    return {
      message: '',
      data: [],
    };
  }
}
