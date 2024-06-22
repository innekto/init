import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { MailerService } from '@nestjs-modules/mailer';

import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from 'src/admin/entities/admin.entity';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private mailerService: MailerService,
    private configService: ConfigService,
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
  ) {}

  // async register(data: AuthRegisterDto): Promise<void> {
  //   const existingUser = await this.usersRepository
  //     .createQueryBuilder('user')
  //     .where('user.email = :email OR user.phone = :phone', {
  //       email: data.email,
  //       phone: data.phone,
  //     })
  //     .getOne();

  //   if (existingUser) {
  //     throw new ConflictException({
  //       error: `User with this email or phone number already exists.`,
  //       status: HttpStatus.UNPROCESSABLE_ENTITY,
  //     });
  //   }

  //   const hash = crypto
  //     .createHash('sha256')
  //     .update(randomStringGenerator())
  //     .digest('hex')
  //     .slice(-6);

  //   const user = await this.usersRepository.save({
  //     ...data,
  //     email: data.email,
  //     password: await argon2.hash(data.password),
  //     hash,
  //   });

  //   await this.mailerService.sendMail({
  //     from: 'virchenko.vlad.2021@gmail.com',
  //     to: user.email,
  //     subject: 'Підтвердження реєстрації',
  //     html: `Для завершення реєстрації введіть код:${hash}`,
  //   });
  // }

  // async confirmEmail(hash: string): Promise<object> {
  //   const user = await this.usersRepository.findOne({ where: { hash } });

  //   if (!user) {
  //     throw new NotFoundException({
  //       error: 'wrong hash',
  //       status: HttpStatus.NOT_FOUND,
  //     });
  //   }

  //   const { token, refreshToken } = await this.generateTokens({
  //     id: user.id,
  //     email: user.email,
  //     role: user.role,
  //   });

  //   const decodedToken: any = this.jwtService.decode(token, { json: true });

  //   user.isConfirm = true;
  //   user.online = true;
  //   user.hash = null;

  //   await this.usersRepository.save(user);
  //   return { user, token, refreshToken, tokenExpires: decodedToken.exp * 1000 };
  // }

  // async refreshToken(id: number) {
  //   const user = await this.usersRepository.findOneByOrFail({ id });

  //   if (!user) {
  //     throw new NotFoundException('user not found');
  //   }

  //   const { token, refreshToken } = await this.generateTokens({
  //     id: user.id,
  //     email: user.email,
  //     role: user.role,
  //   });

  //   const decodedToken: JwtPayload = this.jwtService.decode(token, {
  //     json: true,
  //   });
  //   console.log('decodedToken', decodedToken);

  //   return { refreshToken, token, tokenExpires: decodedToken.exp * 1000 };
  // }

  async generateTokens(user: { id: number; email: string; role: string }) {
    const [token, refreshToken] = await Promise.all([
      await this.jwtService.signAsync({
        id: user.id,
        role: user.role,
      }),

      await this.jwtService.signAsync(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        {
          expiresIn: '7d',
          secret: this.configService.get<string>('REFRESH_JWT_SECRET'),
        },
      ),
    ]);
    return {
      token,
      refreshToken,
    };
  }

  async refreshToken(previousRefreshToken: string) {
    const payload = await this.jwtService.verifyAsync(previousRefreshToken, {
      secret: this.configService.get<string>('REFRESH_JWT_SECRET'),
    });

    const now = Math.floor(Date.now() / 1000);

    if (payload.exp < now) {
      await this.adminLogout(payload.sub);
      throw new UnauthorizedException('Expired refresh token');
    }

    const { token, refreshToken } = await this.generateTokens({
      email: payload.email,
      role: payload.role,
      id: payload.sub,
    });

    return { token, refreshToken };
  }

  async adminLogout(adminId: number) {
    const admin = await this.adminRepository.findOneByOrFail({ id: adminId });
    admin.isOnline = false;
    return await this.adminRepository.save(admin);
  }
  // async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
  //   const user = await this.userService.findOne(forgotPasswordDto.email);

  //   if (!user) {
  //     throw new BadRequestException('Invalid email');
  //   }

  //   // Generate a token for password reset
  //   const token = this.jwtService.sign(
  //     { id: user.id, email: user.email },
  //     { expiresIn: '1h' },
  //   );

  //   // Construct the reset password link
  //   const resetLink = `${process.env.CLIENT_APP_URL}/auth/reset-password?token=${token}`;

  //   await this.mailerService.sendMail({
  //     from: 'virchenko.vlad.2021@gmail.com',
  //     to: user.email,
  //     subject: 'forgot password',
  //     html: `

  //               <p>Please use this <a href="${resetLink}">link</a> to reset your password.</p>
  //           `,
  //   });
  //   return { message: 'Password reset link sent successfully' };
  // }
}
