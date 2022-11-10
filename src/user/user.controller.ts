import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
// import { GetUser } from './decorators/get-user.decorator';
import { AddUserDto } from './dto/adduser.dto';
import { get } from 'http';
import { SignInCredentialsDto } from './dto/signin.dto';

//   import { CheckEmailDto } from './dto/check-email.dto';
//   import { RefreshTokenDto } from './dto/refresh-token.dto';
//   import { UpdateCredentialDto } from './dto/update-user.dto';
//   import { SignInCredentialsDto } from './dto/signin.dto';
//   import { DeleteUserDto } from './dto/delete-user.dot';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  register(
    @Body() addUserDto: AddUserDto,
  ): Promise<{ accessToken: string; role: string }> {
    return this.userService.addUser(addUserDto);
  }

  @ApiForbiddenResponse({ description: 'not authorized' })
  @Post('/signin')
  signIn(
    @Body() signinCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string; role: string }> {
    return this.userService.signIn(signinCredentialsDto);
  }

  @Get()
  getAllUsers(): Promise<UserEntity[]> {
    return this.userService.getAllUser();
  }
}
