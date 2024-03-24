import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/auth/dto';
import { InvoiceService } from '../invoice.service';

describe('AuthService Int', () => {
  let prisma: PrismaService;
  let authService: AuthService;
  let invoiceService: InvoiceService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    authService = moduleRef.get(AuthService);
    invoiceService = moduleRef.get(InvoiceService);
    await prisma.cleanDataBase();
  });

  describe('GetInvoices()', () => {
    const dto: LoginDto = {
      email: 'john@doe.com',
      password: 'Qwerty1$',
    };
    let profileId: number;
    it('should create a new user instance', async () => {
      const resp = await authService.login(dto);
      expect(resp.data.profile.email).toBe('john@doe.com');
      profileId = resp.data.profile.id;
    });
    it('should get the invoices', async () => {
      const resp = await invoiceService.getInvoices(profileId);
      expect(resp.data).toBeTruthy();
    });
  });
});
