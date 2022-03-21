import { Body, Controller, Get, HttpCode, Post, Put } from '@nestjs/common';
import { Authorization } from '../../global/authentication';
import { UserdeskService } from './userdesk.service';

@Controller('userdesk')
export class UserdeskController {
  constructor(private readonly userdeskService: UserdeskService) {}

  @Get()
  async getDeskContent(@Authorization() as: any) {
    return await this.userdeskService.getDeskContent(as.userId);
  }

  @Post()
  async postDeskContent(@Authorization() as: any, @Body() contentId: number) {
    console.log(contentId);
    return await this.userdeskService.putDeskContent(as.deskId, contentId);
  }
}
