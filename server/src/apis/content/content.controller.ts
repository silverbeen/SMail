import { Controller, Get, Query } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  // 카테고리 필터링
  @Get()
  async getContentList(@Query('id') id: number) {
    return await this.contentService.getContentList(id);
  }
}
