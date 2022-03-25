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
    const userDeskContent = await this.deskContentRepository.find({
      userDeskId: userDesk.userDeskId,
    });

    const test = {
      userDeskId: userDesk.userDeskId,
      content: [],
    };
    const content = await Promise.all(
      userDeskContent.map(async (content) => {
        const contents = await this.contentRepository
          .createQueryBuilder('content')
          .select('content.content')
          .addSelect('content.content_id', 'contentId')
          .leftJoinAndSelect('content.desk_content', 'desk_content')
          .where('content.content_id = :id', { id: content.contentId })
          // .andWhere('content.user_desk_id =:id', { id: test.userDeskId })
          .getRawOne();

        //console.log(content.content);
        //const userDeskContentId = content.deskContentId;

        console.log(content.deskContentId);
        return contents;
      }),
    );

    test.content = content;

    return test;
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

  // TODO: 내 서랍 삭제 API 제작
}
