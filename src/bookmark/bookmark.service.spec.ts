import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkService } from './bookmark.service';
import { PrismaService } from '../prisma/prisma.service';

describe('BookmarkService', () => {
  let service: BookmarkService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookmarkService,
        {
          provide: PrismaService, // Provide the Prisma service token
          useValue: {
            bookmark: {
              findMany: jest.fn(),
              findFirst: jest.fn(),
              create: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },],
    }).compile();

    service = module.get<BookmarkService>(BookmarkService);
    prismaService = module.get<PrismaService>(
      PrismaService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
