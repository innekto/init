import { BadRequestException, Injectable } from '@nestjs/common';
// import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { AdminLoginDto } from './dto/login.dto';

import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { ImageService } from 'src/image/image.service';
import { checkImageFields } from 'src/image/helpers/check.image.fields';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    private jwtService: JwtService,
    private authService: AuthService,
    private readonly imageServiсe: ImageService,
  ) {}

  async adminLogin(loginDto: AdminLoginDto) {
    const admin = await this.adminRepository.findOneByOrFail({
      email: loginDto.email,
    });

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      admin.password,
    );

    if (!isValidPassword) {
      throw new BadRequestException('Invalid password');
    }

    admin.isOnline = true;
    await this.adminRepository.save(admin);

    const { token, refreshToken } = await this.authService.generateTokens({
      id: admin.id,
      email: admin.email,
      role: admin.role,
    });

    const decodedToken = this.jwtService.decode(token, { json: true });

    return {
      token,
      tokenExpires: decodedToken.exp * 1000,
      refreshToken,
      user: admin,
    };
  }

  async getMe(adminId: number) {
    return await this.adminRepository.findOneByOrFail({ id: adminId });
  }

  async update(adminId: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminRepository.findOneByOrFail({ id: adminId });

    Object.assign(admin, updateAdminDto);
    return await this.adminRepository.save(admin);
  }

  // create(createAdminDto: CreateAdminDto) {
  //   return 'This action adds a new admin';
  // }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }

  async adminLogout(adminId: number) {
    return await this.authService.adminLogout(adminId);
  }

  async editPhoto(adminId: number, photoId: number) {
    const admin = await this.adminRepository.findOneOrFail({
      where: { id: adminId },
      relations: ['image'],
    });

    if (admin.image) {
      const removedImageId = admin.image.id;
      admin.image = null;
      await this.adminRepository.save(admin);
      await this.imageServiсe.remove(removedImageId);
    }

    const image = await this.imageServiсe.findOneById(photoId);

    checkImageFields(image);
    admin.image = image;
    await this.adminRepository.save(admin);
    return { imageUrl: image.imagePath };
  }
}
