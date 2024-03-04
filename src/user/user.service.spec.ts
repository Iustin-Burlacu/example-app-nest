import {
  Test,
  TestingModule,
} from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { EditUserDto } from './dto';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;
  const userDataUpdated: User = {
    id: 1,
    email: 'john@smith.com',
    firstName: 'Luca',
    lastName: 'Pino',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
    hash: '',
  };

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          UserService,
          {
            provide: PrismaService, // Provide the Prisma service token
            useValue: {
              user: {
                update: jest.fn(),
              },
            },
          },
        ],
      }).compile();

    userService =
      module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(
      PrismaService,
    );
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('signup', () => {
    it('should update a user and return it', async () => {
      const dto: EditUserDto = {
        firstName: 'Luca',
        lastName: 'Pino',
      };
      jest
        .spyOn(prismaService.user, 'update')
        .mockResolvedValue(userDataUpdated);
      const result: User =
        await userService.editUser(
          userDataUpdated.id,
          dto,
        );
      expect(result).toEqual(userDataUpdated);
    });
  });
});
