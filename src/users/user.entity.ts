import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import LocalFile from '../localFiles/localFile.entity';
import Cart from '../cart/cart.entity';
import { Role } from './role/role.enum';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public email: string;

  @Column({ nullable: true })
  public phoneNumber?: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column({nullable:true})
  public otp: string;

  @Column({ nullable: false,default:0})
  public points: number;

  @Column({ 
    type:'enum',
    enum:Role,
    default:Role.ADMIN
  })
  public role: Role;

  @Column({ nullable: true})
  public rewardId: number;

  @Column({ nullable: true })
  @Exclude()
  public password?: string;

  @Column({ default: false })
  public isRegisteredWithGoogle: boolean;

  @JoinColumn({ name: 'avatarId' })
  @OneToOne(() => LocalFile, {
    nullable: true,
  })
  public avatar?: LocalFile;

  @Column({ nullable: true })
  public avatarId?: number;

  @Column({
    nullable: true,
  })
  @Exclude()
  public currentHashedRefreshToken?: string;

  @Column({ nullable: true })
  public twoFactorAuthenticationSecret?: string;

  @Column({ default: false })
  public isTwoFactorAuthenticationEnabled: boolean;

  @Column({ nullable: true })
  public stripeCustomerId: string;

  @Column({ nullable: true })
  public monthlySubscriptionStatus?: string;

  @Column({ default: false })
  public isEmailConfirmed: boolean;

  @Column({ default: false })
  public isPhoneNumberConfirmed: boolean;

  @Column({ type: 'date', nullable: true })
  public dateOfBirth: Date;

  @OneToOne(() => Cart, (cart)=>cart.user)
  public cart: Cart;
}

export default User;
