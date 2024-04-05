import { Injectable } from '@nestjs/common';
import { CreateBusinessFormDto } from './dto/create-business-form.dto';
import { isValidService } from './service-list/service-list';
import { BusinessForm } from './entities/business-form.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';

@Injectable()
export class BusinessFormService {
  constructor(
    @InjectRepository(BusinessForm)
    private businessFormRepository: Repository<BusinessForm>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(file: Express.Multer.File, payload: CreateBusinessFormDto) {
    isValidService(payload.marketingWishes);

    const newBusinessForm = new BusinessForm(payload);

    if (file) {
      const upload = await this.cloudinaryService.uploadFile(file);
      const imagePath = upload.secure_url;
      newBusinessForm.imagePath = imagePath;
    }
    return await this.businessFormRepository.save(newBusinessForm);
  }

  async findAll() {
    return await this.businessFormRepository.find();
  }

  async remove(id: number) {
    return await this.businessFormRepository.delete(id);
  }
}
