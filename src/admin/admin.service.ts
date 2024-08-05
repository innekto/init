import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
// import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { AdminLoginDto } from './dto/login.dto';

import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

import { EditPhotoDto } from './dto/edit-photo.dto';
import { publicIdExtract } from 'src/common/helpers/public-id.extraction';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    private jwtService: JwtService,
    private authService: AuthService,
    private cloudinaryService: CloudinaryService,
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
      tokenExpires: decodedToken.exp,
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

  async editPhoto(
    image: Express.Multer.File,
    adminId: number,
    payload: EditPhotoDto,
  ) {
    const admin = await this.adminRepository.findOneOrFail({
      where: { id: adminId },
    });

    if (image && admin.imagePath) {
      const publicId = publicIdExtract(admin.imagePath);
      await this.cloudinaryService.deleteFile(publicId);
    }

    const { secure_url } = await this.cloudinaryService.uploadFile(image);

    if (!secure_url) {
      throw new HttpException(
        'Error uploading image',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    this.adminRepository.update(admin.id, {
      imagePath: secure_url,
      imageAlt: payload.imageAlt ? payload.imageAlt : admin.imageAlt,
    });
    return { secure_url };
  }
}
