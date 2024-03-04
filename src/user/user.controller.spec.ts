import {
  Test,
  TestingModule,
} from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { EditUserDto } from './dto';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  const userData: User = {
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
        controllers: [UserController],
        providers: [
          {
            provide: UserService,
            useValue: {
              getMe: jest.fn(),
              editUser: jest.fn(),
            },
          },
        ],
      }).compile();

    controller = module.get<UserController>(
      UserController,
    );
    userService =
      module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMe', () => {
    it('should return current user', async () => {
      expect(controller.getMe(userData)).toBe(
        userData,
      );
    });
  });

  it('should call userService.editUser with correct parameters', async () => {
    const dto: EditUserDto = {
      firstName: 'Luca',
      lastName: 'Pino',
    };
    const editedUser: User = { ...dto } as User;

    jest
      .spyOn(userService, 'editUser')
      .mockResolvedValue(editedUser);

    const result = await controller.editUser(
      userData.id,
      dto,
    );

    expect(
      userService.editUser,
    ).toHaveBeenCalledWith(userData.id, dto);
    expect(result).toBe(editedUser);
  });
});
