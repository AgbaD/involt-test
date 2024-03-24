import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from '../auth.service';
import { LoginDto, RegisterDto } from '../dto';
import { Profile } from '@prisma/client';

describe('AuthService Int', () => {
  let prisma: PrismaService;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    authService = moduleRef.get(AuthService);
    await prisma.cleanDataBase();
  });

  describe('Resgister()', () => {
    const wrongDto: RegisterDto = {
      email: 'john@doe.com',
      password: 'Qwerty!$',
      repeatPassword: 'Qwerty!$',
      fullname: 'John Doe',
    };
    const dto: RegisterDto = {
      email: 'john@doe.com',
      password: 'Qwerty1$',
      repeatPassword: 'Qwerty1$',
      fullname: 'John Doe',
    };
    it('should throw bad password error', async () => {
      await authService
        .register(wrongDto)
        .then((res) => expect(res).toBeUndefined())
        .catch((error) => expect(error.status).toBe(400));
    });
    it('should create a new user instance', async () => {
      const resp = await authService.register(dto);
      expect(resp.data.profile.email).toBe('john@doe.com');
    });
    it('should throw duplicate error', async () => {
      await authService
        .register(dto)
        .then((res) => expect(res).toBeUndefined())
        .catch((error) => expect(error.status).toBe(400));
    });
  });

  describe('Login()', () => {
    const wrongDto: LoginDto = {
      email: 'jhon@doe.com',
      password: 'Qwerty1$',
    };
    const dto: LoginDto = {
      email: 'john@doe.com',
      password: 'Qwerty1$',
    };
    it('should return wrong credentials', async () => {
      await authService
        .login(wrongDto)
        .then((res) => expect(res).toBeUndefined())
        .catch((error) => expect(error.status).toBe(401));
    });
    it('should login and return token', async () => {
      const resp = await authService.login(dto);
      expect(resp.data.profile.email).toBe('john@doe.com');
    });
  });

  describe('GetXeroAccessUrl()', () => {
    it('should return the url', async () => {
      const resp = await authService.getXeroAccessUrl();
      expect(resp.url).toBeTruthy();
    });
  });

  describe('SignToken()', () => {
    const dto: LoginDto = {
      email: 'john@doe.com',
      password: 'Qwerty1$',
    };
    let profile: Profile;
    it('should login and get profile', async () => {
      const resp = await authService.login(dto);
      expect(resp.data.profile.email).toBe('john@doe.com');
      profile = resp.data.profile;
    });
    it('should return the jwt token', async () => {
      const resp = await authService.signToken(profile);
      expect(resp).toBeTruthy();
    });
  });

  // describe('GetXeroAccessToken()', () => {
  //   const code = '';
  //   it('should return the access token', async () => {
  //     const resp = await authService.getXeroAccessUrl();
  //     expect(resp.url).toBeTruthy();
  //   });
  // });
});
