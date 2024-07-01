import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Member } from '../../../member/entities/member.entity';

import { membersData, membersImages } from 'src/database/service/data-creation';

@Injectable()
export class MemberSeedService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  async run() {
    const count = await this.memberRepository.count();

    if (count === 0) {
      await Promise.all(
        membersData.map(async (item, index) => {
          const newMember = new Member(item);
          newMember.imageAlt = membersImages[index].description;
          newMember.imagePath = membersImages[index].imagePath;
          await this.memberRepository.save(newMember);
        }),
      );
    }
  }
}
