import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async create(file: Express.Multer.File, payload: CreateMemberDto) {
    const upload = await this.cloudinaryService.uploadFile(file);
    const newMember = new Member({ ...payload, imagePath: upload.secure_url });
    return await this.memberRepository.save(newMember);
  }

  async findAll() {
    return await this.memberRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
