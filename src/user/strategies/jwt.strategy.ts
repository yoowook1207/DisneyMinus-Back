import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserEntity } from '../entities/user.entity';
import { JwtPayload } from '../interface/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: 'superSecretKey',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate({ email }: { email: string }): Promise<UserEntity> {
    // validate help to return the user;
    const user: UserEntity = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      console.log(user);
      throw new UnauthorizedException();
    }

    return user;
  }
}
