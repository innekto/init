import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { publicIdExtract } from 'src/common/helpers/public-id.extraction';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async create(
    file: Express.Multer.File,
    payload: CreateMemberDto,
  ): Promise<Member> {
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

  async update(
    file: Express.Multer.File,
    id: number,
    payload: UpdateMemberDto,
  ): Promise<Member> {
    const member = await this.memberRepository.findOneByOrFail({ id });

    if (file) {
      const publicId = publicIdExtract(member.imagePath);

      await this.cloudinaryService.deleteFile(publicId);
      const upload = await this.cloudinaryService.uploadFile(file);
      member.imagePath = upload.secure_url;
    }

    Object.assign(member, payload);
    const updatedMember = await this.memberRepository.save(member);

    return updatedMember;
  }

  async remove(id: number) {
    const member = await this.memberRepository.findOneByOrFail({ id });
    await this.memberRepository.remove(member);
  }
}
