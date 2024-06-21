import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Social } from 'src/social/entities/social.entity';
import { socialData } from 'src/database/service/data-creation/social';
import { Member } from 'src/member/entities/member.entity';
import { membersData } from 'src/database/service/data-creation';

@Injectable()
export class SocialSeedService {
  constructor(
    @InjectRepository(Social)
    private socialRepository: Repository<Social>,
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  async run() {
    const count = await this.socialRepository.count();
    const memberCount = await this.memberRepository.count();

    if (memberCount === 10 && count === 0) {
      await this.socialRepository.manager.transaction(async (manager) => {
        await Promise.all(
          socialData.map(async (item, index) => {
            const newSocial = new Social(item);
            const savedSocial = await manager.save(Social, newSocial);

            const member = await manager.findOneOrFail(Member, {
              where: {
                name: membersData[index].name,
              },
            });

            member.social = savedSocial;

            await manager.save(Member, member);
          }),
        );
      });
    }
  }
}
