import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsBoolean,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class AddUserDto {
  @ApiProperty({
    description: 'show username in the header or nav after user signin',
  })
  // @IsString()
  // @MinLength(4)
  // @MaxLength(10)
  // readonly username: string;
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsBoolean()
  agreeTerm: boolean;

  @ApiProperty()
  @IsString()
  readonly pwd: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(UserRole)
  readonly role: string;

  @ApiProperty()
  @IsString()
  @MinLength(15)
  tmdb_key: string;
}
