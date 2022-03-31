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

    console.log(deskContent);

    return await this.contentRepository.find({ fieldId: id });
  }
}
