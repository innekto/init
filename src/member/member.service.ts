import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { publicIdExtract } from 'src/common/helpers/public-id.extraction';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    private cloudinaryService: CloudinaryService,
  ) {}
  async create(
    payload: CreateMemberDto,
    image: Express.Multer.File,
  ): Promise<Member> {
    const newMember = new Member(payload);
    const { secure_url } = await this.cloudinaryService.uploadFile(image);
    newMember.imagePath = secure_url;

    return await this.memberRepository.save(newMember);
  }

  async findAll() {
    const result = await this.memberRepository.find();

    return result;
  }

  async update(
    id: number,
    payload: UpdateMemberDto,
    image?: Express.Multer.File,
  ): Promise<Member> {
    const member = await this.memberRepository.findOneOrFail({
      where: { id },
    });

    if (image) {
      const publicId = publicIdExtract(member.imagePath);
      await this.cloudinaryService.deleteFile(publicId);
      const { secure_url } = await this.cloudinaryService.uploadFile(image);
      member.imagePath = secure_url;
    }

    Object.assign(member, payload);

    const updatedMember = await this.memberRepository.save(member);

    return updatedMember;
  }

  async remove(id: number) {
    const member = await this.memberRepository.findOneOrFail({
      where: { id },
    });

    await this.memberRepository.remove(member);
  }
}
