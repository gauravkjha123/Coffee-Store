import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import User from '../users/user.entity';
import PointStatus from './enum/pointtStatus.enum';

@Entity()
class PointManagement {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: true})
  public phoneNumber: string;

  @Column({ nullable: false,default:0})
  public points: number;

  @Column( {
    type:'enum',
    enum:PointStatus,
    nullable:true
  })
  public status: PointStatus;

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => User, {
    nullable: true,
  })
  public user: User;

  @Column({ nullable: true })
  public userId?: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}

export default PointManagement;
