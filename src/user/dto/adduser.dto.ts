import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class AddUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  pwd: string;

  @IsBoolean()
  agreeTerm: boolean;
}
