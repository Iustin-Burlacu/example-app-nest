import {
  Test,
  TestingModule,
} from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import * as argon from 'argon2';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto';
import { Token } from './interface';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ForbiddenException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;
  let configService: ConfigService;
  const dto: AuthDto = {
    email: 'test@example.com',
    password: 'strongPassword123',
  };

  let userData: User = {
    id: 1,
    email: 'john@smith.com',
    firstName: 'John',
    lastName: 'Dow',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
    hash: '',
  };

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          AuthService,
          {
            provide: PrismaService, // Provide the Prisma service token
            useValue: {
              user: {
                create: jest.fn(), // Mock the user creation method
                findUnique: jest.fn(), // Mock the user findUnique method
              },
            },
          },
          {
            provide: JwtService,
            useValue: {},
          },
          {
            provide: ConfigService,
            useValue: {},
          },
        ],
        imports: [
          ConfigModule.forRoot(),
          JwtModule,
        ],
      }).compile();

    authService =
      module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(
      PrismaService,
    );
    jwtService =
      module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(
      ConfigService,
    );
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signup', () => {
    it('should create a new user and return a token', async () => {
      const hash: string = await argon.hash(
        dto.password,
      );
      userData = { ...userData, hash };
      jest
        .spyOn(prismaService.user, 'create')
        .mockResolvedValue(userData);
      jest
        .spyOn(authService, 'signToken')
        .mockResolvedValue({
          access_token: 'fakeToken',
        });

      /* expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          email: dto.email,
          hash,
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      }); */

      const result: Token =
        await authService.signup(dto);

      expect(result).toEqual({
        access_token: 'fakeToken',
      });
    });

    it('should throw ForbiddenException if credentials are taken', async () => {
      const dto: AuthDto = {
        email: 'test@example.com',
        password: 'strongPassword123',
      };

      jest
        .spyOn(prismaService.user, 'create')
        .mockRejectedValue(
          new PrismaClientKnownRequestError(
            'Credentials incorrect',
            { code: 'P2002', clientVersion: '1' },
          ),
        );

      await expect(
        authService.signup(dto),
      ).rejects.toThrow(ForbiddenException);
    });

    /*it('should rethrow other errors', async () => {
      jest.spyOn(prismaService.user, 'create')
        .mockRejectedValue(
          new Error(),
        );

      await expect(
        authService.signup({email: '', password: ''}),
      ).rejects.toThrow(new Error('Error'));
    });*/
  });
});
