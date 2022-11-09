import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AddUserDto } from './user/dto/adduser.dto';
import { User } from './user/interface/user.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
