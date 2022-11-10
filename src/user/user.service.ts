import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
// json web token
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interface/jwt-payload.interface';

import { AddUserDto } from './dto/adduser.dto';
import { UserRole } from './enums/user-role.enum';
import { UpdateCredentialDto } from './dto/update-user.dto';
import { SignInCredentialsDto } from './dto/signin.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async getAllUser(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async addUser(
    addUserDto: AddUserDto,
  ): Promise<{ accessToken: string; role: UserRole }> {
    try {
      const { pwd, email, tmdb_key, role } = addUserDto;

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(pwd, salt);

      const user = this.userRepository.create({
        pwd: hashedPassword,
        email,
        tmdb_key,
        role: UserRole[role] || UserRole.USER || 'no set',
      });

      // POST method
      await this.userRepository.save(user);
      const userdb = await this.userRepository.findOne({
        where: { email },
      });
      //return token
      const accessToken: string = this.createToken(userdb);

      return { accessToken, role: user.role };
    } catch (error) {
      if (error.code === '11000') {
        throw new ConflictException('Username already exists');
      } else if (error.code === '23505') {
        // postgresql error
        throw new InternalServerErrorException();
      } else if (error.code === '500') {
        throw error;
      }
    }
  }

  async signIn(
    signinCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string; role: string }> {
    const { email, password } = signinCredentialsDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.pwd))) {
      const accessToken: string = this.createToken(user);
      return { accessToken, role: user.role };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async getUser(user: UserEntity): Promise<UserEntity> {
    const existUser = await this.userRepository.findOne({
      where: user,
    });
    if (!existUser)
      throw new NotFoundException(`User "${user.email}" not found!`);
    return user;
  }

  /* Update User Info @Patch */
  async updateUser(updateCredentialDto: UpdateCredentialDto, user: UserEntity) {
    const { role } = updateCredentialDto;

    await this.userRepository.update(
      { email: user.email },
      {
        ...updateCredentialDto,
        role: UserRole[role],
      },
    );
    const updatedUser = await this.userRepository.findOne({
      where: { email: user.email },
    });
    const accessToken: string = this.createToken(updatedUser);
    return { accessToken, role: updatedUser.role };
  }

  private createToken(user: UserEntity) {
    const payload: JwtPayload = {
      id: user.id.toString(),
      email: user.email,
      tmdb_key: user.tmdb_key,
    };

    const accessToken: string = this.jwtService.sign(payload);
    return accessToken;
  }
}
