import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import LocalFile from '../localFiles/localFile.entity';
import RewardManagement from '../rewardManagement/rewardManagement.entity';

@Entity()
class Reward {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;
  
  @Column({ nullable: false,default:0})
  public point: number;

  @Column({ nullable: true })
  public description: string;

  @Column({nullable:false,default:0})
  public discount: number;

  @JoinColumn({ name: 'rewardImageId' })
  @OneToOne(() => LocalFile, {
    nullable: true,
  })
  public rewardImage: LocalFile;

  @Column({nullable:true})
  public rewardImageId: number;

  @OneToMany(() => RewardManagement, (rewardManagement) => rewardManagement.reward)
  rewardManagement: RewardManagement[]

  @Column({nullable:false,default:0})
  public expiryDay: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

export default Reward;
