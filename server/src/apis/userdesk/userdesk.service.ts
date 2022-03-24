import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from '../../entities/Content';
import { DeskContent } from '../../entities/DeskContent';
import { UserDesk } from '../../entities/UserDesk';

@Injectable()
export class UserdeskService {
  constructor(
    @InjectRepository(UserDesk)
    private readonly userDeskRepository: Repository<UserDesk>,
    @InjectRepository(DeskContent)
    private readonly deskContentRepository: Repository<DeskContent>,
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
  ) {}

  // 서랍 가져오기
  async getDeskContent(id: string) {
    const userDesk = await this.userDeskRepository.findOne({ userUserId: id });
    const useDeskContent = await this.deskContentRepository.find({
      userDeskId: userDesk.userDeskId,
    });

    const content = await Promise.all(
      useDeskContent.map(async (content) => {
        const contents = await this.contentRepository
          .createQueryBuilder('content')
          .select('content.content')
          .addSelect('content.content_id', 'contentId')
          .where('content.content_id = :id', { id: content.contentId })
          .getRawMany();

        console.log(contents);

        return contents;
      }),
    );

    return content;
  }

  // 서랍 넣기
  async putDeskContent(desk_id: number, content_id: number) {
    const desk = await this.userDeskRepository.findOne({ userDeskId: desk_id });
    const content = await this.contentRepository.findOne(content_id);

    const deskContent = new DeskContent();
    deskContent.userDeskId = desk_id;
    deskContent.contentId = content_id;
    deskContent.userDesk = desk;
    deskContent.content = content;

    await this.deskContentRepository.save(deskContent);

    return;
  }
}
