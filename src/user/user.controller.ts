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
import { GetUser } from './decorators/get-user.decorator';
import { UpdateCredentialDto } from './dto/update-user.dto';
import { CheckEmailDto } from './dto/check-email.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

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

  @Post('/refresh-token')
  // token in header ---> { "Authorization": `Bearer ${token}` }
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.userService.refreshToken(refreshTokenDto);
  }

  @Post('/check-email')
  checkEmail(@Body() checkEmailDto: CheckEmailDto) {
    return this.userService.checkEmail(checkEmailDto);
  }

  @Patch('/userupdate')
  @UseGuards(AuthGuard('jwt'))
  updateUser(
    @GetUser() user: UserEntity,
    @Body() updateCredentialDto: UpdateCredentialDto,
  ) {
    console.log(user.id.toString());
    return this.userService.updateUser(updateCredentialDto, user);
  }

  @Post('/deleteuser')
  @UseGuards(AuthGuard('jwt'))
  deleteAnyUser(
    @GetUser() user: UserEntity,
    @Body() deleteUserDto: DeleteUserDto,
  ) {
    return this.userService.deleteAnyUser(deleteUserDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  deleteUserById(@GetUser() user: UserEntity, @Param('id') id: string) {
    return this.userService.deleteUserById(user, id);
  }

  @Get('/testjwt')
  @UseGuards(AuthGuard('jwt'))
  testjwt(
    // @Req() req
    @GetUser() user: UserEntity,
  ) {
    console.log(user);
  }
}
