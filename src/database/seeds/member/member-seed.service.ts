import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { membersData } from 'src/database/service/data-creation/member';
import { Member } from '../../../member/entities/member.entity';

@Injectable()
export class MemberSeedService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  async run() {
    const count = await this.memberRepository.count();

    if (count === 0) {
    }
    await Promise.all(
      membersData.map(async (item) => {
        const { imagePath, ...rest } = item;
        const newMember = new Member(rest);
        newMember.imagePath = imagePath;
        await this.memberRepository.save(newMember);
      }),
    );
  }
}
