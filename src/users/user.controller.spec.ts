// import { Test, TestingModule } from '@nestjs/testing';
// import { UsersController } from './users.controller';
// import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { User } from './user.entity';
// import { HttpStatus, BadGatewayException } from '@nestjs/common';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { JwtService } from '@nestjs/jwt';
// import { MailerService } from '@nestjs-modules/mailer';

// describe('UsersController', () => {
//   let usersController: UsersController;
//   let usersService: UsersService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UsersController],
//       providers: [
//         UsersService,
//         {
//           provide: getRepositoryToken(User), // Надаємо залежність User
//           useClass: Repository, // Використовуємо тип Repository для залежності
//         },
//         {
//           provide: JwtService, // Надаємо мок-об'єкт JwtService
//           useValue: {
//             signAsync: () => 'exampleToken', // Імітуємо метод signAsync
//           },
//         },
//         {
//           provide: MailerService, // Надаємо мок-об'єкт MailerService
//           useValue: {
//             sendMail: () => {
//               'string';
//             }, // Імітуємо метод sendMail
//           },
//         },
//       ],
//     }).compile();

//     usersController = module.get<UsersController>(UsersController);
//     usersService = module.get<UsersService>(UsersService);
//   });

//   describe('create', () => {
//     it('should create a user', async () => {
//       // Arrange
//       const createUserDto: CreateUserDto = {
//         email: 'vir@df.com',
//         password: 'examplePassword',
//         firstName: 'John',
//         lastName: 'Doe',
//       };
//       const token = 'exampleToken';

//       const createdUser: User = {
//         id: 1,
//         email: createUserDto.email,
//         password: 'hashedPassword',
//         status: 'active',
//         hash: 'exampleHash',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         deletedAt: null,
//         isConfirm: '',
//         column: '',
//       };

//       // Mock the service method to return the created user
//       jest
//         .spyOn(usersService, 'create')
//         .mockResolvedValue({ user: createdUser, token });

//       // Act
//       const result = await usersController.create(createUserDto);

//       // Assert
//       expect(result.user.email).toBe(createUserDto.email);
//       expect(result.user.password).not.toBe(createUserDto.password);
//       expect(result.user.hash).toBeTruthy();
//       expect(result.token).toBeTruthy();
//     });

//     it('should handle email duplication', async () => {
//       // Arrange
//       const createUserDto: CreateUserDto = {
//         email: 'duplicate@example.com',
//         password: 'examplePassword',
//         firstName: 'John',
//         lastName: 'Doe',
//       };

//       // Mock the service method to throw a duplication exception
//       jest
//         .spyOn(usersService, 'create')
//         .mockRejectedValue(new BadGatewayException('This email already exist'));

//       // Act and Assert
//       await expect(usersController.create(createUserDto)).rejects.toThrowError(
//         'This email already exist',
//       );
//     });
//   });
// });

import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { HttpStatus, BadGatewayException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

class FakeJwtService {
  async signAsync() {
    return 'exampleToken';
  }
}

class FakeMailerService {
  async sendMail() {
    return 'string';
  }
}

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const fakeUserRepository = {
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: fakeUserRepository,
        },
        {
          provide: JwtService,
          useClass: FakeJwtService,
        },
        {
          provide: MailerService,
          useClass: FakeMailerService,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('should create a user', async () => {
      // Arrange
      const createUserDto: CreateUserDto = {
        email: 'vir@df.com',
        password: 'examplePassword',
        firstName: 'John',
        lastName: 'Doe',
      };

      const createdUser: User = {
        id: 1,
        email: createUserDto.email,
        password: 'hashedPassword',
        status: 'active',
        hash: 'exampleHash',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        isConfirm: '',
        column: '',
      };

      // Fake the service method to return the created user
      jest.spyOn(usersService, 'create').mockImplementation(async () => {
        return { user: createdUser, token: 'exampleToken' };
      });

      // Act
      const result = await usersController.create(createUserDto);

      // Assert
      expect(result.user.email).toBe(createUserDto.email);
      expect(result.user.password).not.toBe(createUserDto.password);
      expect(result.user.hash).toBeTruthy();
      expect(result.token).toBeTruthy();
    });

    it('should handle email duplication', async () => {
      // Arrange
      const createUserDto: CreateUserDto = {
        email: 'duplicate@example.com',
        password: 'examplePassword',
        firstName: 'John',
        lastName: 'Doe',
      };

      // Fake the service method to throw a duplication exception
      jest
        .spyOn(usersService, 'create')
        .mockRejectedValue(new BadGatewayException('This email already exist'));

      // Act and Assert
      await expect(usersController.create(createUserDto)).rejects.toThrowError(
        'This email already exist',
      );
    });
  });
});
