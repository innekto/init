import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { membersData } from 'src/database/service/data-creation/member';
import { Member } from '../../../member/entities/member.entity';
import { Image } from 'src/image/entities/image.entity';

@Injectable()
export class MemberSeedService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async run() {
    const count = await this.memberRepository.count();

    if (count === 0) {
      await Promise.all(
        membersData.map(async (item) => {
          const newMember = new Member(item);
          newMember.image = await this.imageRepository.findOneOrFail({
            where: { description: item.name },
          });
          await this.memberRepository.save(newMember);
        }),
      );
    }
  }
}
