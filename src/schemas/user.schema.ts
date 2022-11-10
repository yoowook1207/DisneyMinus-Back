import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRole } from 'src/user/enums/user-role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop()
  email: string;

  @Prop()
  agreeTerm: boolean;

  @Prop()
  pwd: string;

  @Prop()
  role: UserRole;

  @Prop()
  tmdb_key: string;
  static email: any;
}

export const UserSchema = SchemaFactory.createForClass(User);