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

@Injectable()
export class DesertService {
  constructor(
    @InjectRepository(Desert) private desertRepository: Repository<Desert>,
    @InjectRepository(DesertTypeEntity)
    private desertTypeRepository: Repository<DesertTypeEntity>,
    @InjectRepository(DesertFillingEntity)
    private desertFilingRepository: Repository<DesertFillingEntity>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(data: CreateDesertDto, file: Express.Multer.File) {
    const isCorrectType = desertType.includes(data.type);
    if (!isCorrectType) {
      throw new ConflictException('Incorrect type of desert');
    }
    const upload = await this.cloudinaryService.uploadFile(file);

    const desert = await this.desertRepository.save({
      ...data,
      imagePath: upload.secure_url,
    });
    return desert;
  }

  async updateDesert(
    id: number,
    file: Express.Multer.File,
    updateDesertDto: UpdateDesertDto,
  ) {
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
    desert.type = updateDesertDto.type;

    desert.name =
      updateDesertDto.name !== '' ? updateDesertDto.name : desert.name;

    desert.price =
      updateDesertDto.price.toString() !== ''
        ? updateDesertDto.price
        : desert.price;

    desert.weight =
      updateDesertDto.weight.toString() !== ''
        ? updateDesertDto.weight
        : desert.weight;

    desert.composition =
      updateDesertDto.composition !== ''
        ? updateDesertDto.composition
        : desert.composition;

    await this.desertRepository.save(desert);
  }

  async findAll() {
    return await this.desertRepository.find();
  }

  async getTypesOfDeserts() {
    const types = await this.desertTypeRepository.find();
    return types.map((type) => type.type);
  }

  async getFilings() {
    const filling = await this.desertFilingRepository.find();
    return filling.map((fil) => {
      return { name: fil.name, image: fil.imagePath };
    });
  }

  async findDesertsOfType(type: string) {
    return await this.desertRepository.find({ where: { type: type } });
  }

  findOne(id: number) {
    return `This action returns a #${id} desert`;
  }

  update(id: number, updateDesertDto: UpdateDesertDto) {
    return `This action updates a #${id} desert`;
  }

  remove(id: number) {
    return `This action removes a #${id} desert`;
  }
}
