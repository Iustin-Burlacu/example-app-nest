import {
  Test,
  TestingModule,
} from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ForbiddenException } from '@nestjs/common';
import { AuthDto } from './dto';
import { Token } from './interface';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        controllers: [AuthController],
        providers: [
          {
            provide: AuthService,
            useValue: {
              signup: jest.fn(),
              signin: jest.fn(),
            },
          },
        ],
      }).compile();

    controller = module.get<AuthController>(
      AuthController,
    );
    authService =
      module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signup', () => {
    it('should return a token when signup is successful', async () => {
      const authDto: AuthDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      const token: Token = {
        access_token: 'fakeToken',
      };

      jest
        .spyOn(authService, 'signup')
        .mockResolvedValue(token);

      const result: Token =
        await controller.signup(authDto);

      expect(result).toBe(token);
      expect(
        authService.signup,
      ).toHaveBeenCalledWith(authDto);
    });

    it('should throw ForbiddenException when signup fails due to existing credentials', async () => {
      const dto: AuthDto = {
        email: 'existing@example.com',
        password: 'existingpassword',
      };

      jest
        .spyOn(authService, 'signup')
        .mockImplementation(async () => {
          throw new ForbiddenException(
            'Credentials taken',
          );
        });

      await expect(
        controller.signup(dto),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('signin', () => {
    it('should return a token when signin is successful', async () => {
      const authDto: AuthDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      const token: Token = {
        access_token: 'fakeToken',
      };

      jest
        .spyOn(authService, 'signin')
        .mockResolvedValue(token);

      const result =
        await controller.signin(authDto);

      expect(result).toBe(token);
      expect(
        authService.signin,
      ).toHaveBeenCalledWith(authDto);
    });
  });
});
