import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDesertDto } from './dto/create-desert.dto';
import { UpdateDesertDto } from './dto/update-desert.dto';
import { Desert } from './entities/desert.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { desertType } from 'src/common/types/desertTypes';
import { DesertTypeEntity } from './entities/desert-type.entity';
import { DesertFillingEntity } from './entities/filling.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class DesertService {
  constructor(
    @InjectRepository(Desert) private desertRepository: Repository<Desert>,
    @InjectRepository(DesertTypeEntity)
    private desertTypeRepository: Repository<DesertTypeEntity>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(DesertFillingEntity)
    private desertFilingRepository: Repository<DesertFillingEntity>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async getAllDeserts() {
    return await this.desertRepository.find();
  }

  async create(data: CreateDesertDto, file: Express.Multer.File) {
    const isCorrectType = desertType.includes(data.type);
    if (!isCorrectType) {
      throw new ConflictException('Incorrect type of desert');
    }
    const upload = await this.cloudinaryService.uploadFile(file);

    const desert = new Desert({ ...data, imagePath: upload.secure_url });
    await this.desertRepository.save(desert);

    return desert;
  }

  async updateDesert(
    id: number,
    file: Express.Multer.File,
    updateDesertDto: UpdateDesertDto,
  ): Promise<Desert> {
    const desert = await this.desertRepository.findOne({ where: { id } });

    if (!desert) {
      throw new NotFoundException(`Desert with id ${id} not found`);
    }

    if (file) {
      const parts = desert.imagePath.split('/');
      const fileName = parts[parts.length - 1];
      const publicId = fileName.split('.')[0];

      await this.cloudinaryService.deleteFile(publicId);

      const upload = await this.cloudinaryService.uploadFile(file);
      desert.imagePath = upload.secure_url;
    }

    const isCorrectType = desertType.includes(updateDesertDto.type);
    if (updateDesertDto.type && !isCorrectType) {
      throw new ConflictException('Incorrect type of desert');
    }

    Object.assign(desert, updateDesertDto);

    const updatedDesert = await this.desertRepository.save(desert);

    return updatedDesert;
  }

  async getTypesOfDeserts() {
    const types = await this.desertTypeRepository.find();
    return types.map((type) => type.type);
  }

  // async getFilings() {
  //   const filling = await this.desertFilingRepository.find();
  //   return filling.map((fil) => {
  //     return { name: fil.name, image: fil.imagePath };
  //   });
  // }

  async findDesertsOfType(type: string) {
    if (!desertType.includes(type)) {
      throw new ConflictException('Incorrect type of dessert');
    }

    const desserts = await this.desertRepository.find({
      where: { type: type },
    });

    if (!desserts) {
      throw new NotFoundException();
    }

    return desserts;
  }

  async findOne(id: number): Promise<Desert> {
    const dessert = await this.desertRepository.findOneOrFail({
      where: { id },
      relations: ['desertFilling'],
    });

    return dessert;
  }

  async remove(id: number) {
    return `This action removes a #${id} desert`;
  }

  async toggleDesertFavorite(userId: number, desertId: number) {
    const user = await this.userRepository.findOneOrFail({
      where: { id: userId },
      relations: ['favoriteDesserts'],
    });

    const desert = await this.desertRepository.findOneOrFail({
      where: { id: desertId },
    });

    const isDesertInFavorites = user.favoriteDesserts.some(
      (favDesert) => favDesert.id === desertId,
    );

    if (isDesertInFavorites) {
      // Видаляємо десерт зі списку фейворітів
      user.favoriteDesserts = user.favoriteDesserts.filter(
        (favDesert) => favDesert.id !== desertId,
      );
    } else {
      // Додаємо десерт до списку фейворітів
      user.favoriteDesserts.push(desert);
    }

    await this.userRepository.save(user);
    return user;
  }
}
