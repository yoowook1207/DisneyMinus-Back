import { PartialType } from '@nestjs/swagger';
import { AddUserDto } from './adduser.dto';

export class UpdateCredentialDto extends PartialType(AddUserDto) {}
