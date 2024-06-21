import { ConflictException, Injectable } from '@nestjs/common';
import { CreateSocialDto } from './dto/create-social.dto';
import { UpdateSocialDto } from './dto/update-social.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/member/entities/member.entity';
import { Repository } from 'typeorm';
import { Social } from './entities/social.entity';

@Injectable()
export class SocialService {
  constructor(
    @InjectRepository(Social)
    private socialRepository: Repository<Social>,
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  async create(memberId: number, payload: CreateSocialDto) {
    const newSocial = new Social(payload);
    const savedSocial = await this.socialRepository.save(newSocial);

    const member = await this.memberRepository.findOneByOrFail({
      id: memberId,
    });

    if (member.social) {
      throw new ConflictException();
    }

    member.social = savedSocial;
    await this.memberRepository.save(member);
  }

  async update(memberId: number, payload: UpdateSocialDto) {
    console.log('payload :>> ', payload);
    const { social } = await this.memberRepository.findOneByOrFail({
      id: memberId,
    });
    await this.socialRepository.update(social.id, payload);
    const updatedSocial = await this.socialRepository.findOneByOrFail({
      id: social.id,
    });
    return updatedSocial;
  }

  remove(id: number) {
    return `This action removes a #${id} social`;
  }
}
