import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import Status from './rewardManagementStatus.enum';
import Reward from '../reward/reward.entity';
import User from '../users/user.entity';

@Entity({name:"reward_management"})
class RewardManagement {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: true})
  public userId: number;

  @Column({ nullable: true})
  public rewardId: number;

  @Column({nullable:true})
  public expiryDate: Date;

  @JoinColumn({ name: 'rewardId' })
  @ManyToOne(() => Reward, {
    nullable: true,
  })
  public reward?: Reward;

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => User, {
    nullable: true,
  })
  public user?: User;

  @Column({ 
  type:'enum',
  enum:Status,
  default:Status.ACTIVE
  })
  public status: Status;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

export default RewardManagement;
