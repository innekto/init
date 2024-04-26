import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ImageService } from 'src/image/image.service';
import { checkImageFields } from 'src/image/helpers/check.image.fields';
import { teamGrouping } from './utils/grouping.for.render';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,

    private readonly imageServise: ImageService,
  ) {}
  async create(payload: CreateMemberDto): Promise<Member> {
    const newMember = new Member(payload);
    const image = await this.imageServise.findOneById(payload.imageId);
    checkImageFields(image);
    newMember.image = image;
    return await this.memberRepository.save(newMember);
  }

  async findAll() {
    const result = await this.memberRepository.find();
    return teamGrouping(result);
  }

  async update(id: number, payload: UpdateMemberDto): Promise<Member> {
    const member = await this.memberRepository.findOneOrFail({
      where: { id },
      relations: ['image'],
    });

    if (payload.imageId) {
      const removedImageId = member.image.id;
      member.image = null;

      await this.memberRepository.save(member);
      await this.imageServise.remove(removedImageId);

      const newImage = await this.imageServise.findOneById(payload.imageId);

      member.image = newImage;
    }

    Object.assign(member, payload);
    const updatedMember = await this.memberRepository.save(member);

    return updatedMember;
  }

  async remove(id: number) {
    const member = await this.memberRepository.findOneOrFail({
      where: { id },
      relations: ['image'],
    });

    await this.memberRepository.remove(member);
    await this.imageServise.remove(member.image.id);
  }
}
