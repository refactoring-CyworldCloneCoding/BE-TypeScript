import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Comments } from './comments';
import { Myhomes } from './myhomes';
import { Users } from './users';

@Entity()
export class Diaries extends BaseEntity {
  @PrimaryGeneratedColumn()
  diaryId!: number;

  @Column()
  userId!: number;

  @Column()
  myhomeId!: number;

  @Column({ default: 0 })
  diaryNo: number;

  @Column()
  content!: string;

  @Column({ nullable: true })
  dirImg: string | null;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @OneToMany(() => Comments, (comments) => comments.diary, {
    cascade: true,
  })
  @JoinColumn()
  comments: Comments[];

  @ManyToOne(() => Users, (user) => user.diaries)
  user!: Users;

  @ManyToOne(() => Myhomes, (myhome) => myhome.diaries)
  myhome!: Myhomes;
}
