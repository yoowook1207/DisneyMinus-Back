import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;
  @Column()
  agreeTerm: boolean;
  @Column()
  pwd: string;
}
