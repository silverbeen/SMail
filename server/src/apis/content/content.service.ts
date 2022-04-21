import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from '../../entities/Content';
import { DeskContent } from '../../entities/DeskContent';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
    @InjectRepository(DeskContent)
    private deskContentRepository: Repository<DeskContent>,
  ) {}

  async getContentList(userDeskId: number, id: number) {
    const deskContent = await this.deskContentRepository.find({
      userDeskId: userDeskId,
    });

    const content = new Content();

    const test = await this.contentRepository.find({ fieldId: id });

    const desk = await this.deskContentRepository.find();

    test.map((testContent) => {
      desk.map((item) => item.contentId === testContent.contentId);
    });

    console.log(test, desk);

    return await this.contentRepository.find({ fieldId: id });
  }
}
