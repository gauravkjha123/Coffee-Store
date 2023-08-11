import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany
} from 'typeorm';
import User from '../users/user.entity';
import CartItem from '../cartItem/cartItem.entity';

@Entity()
class Cart {
  @PrimaryGeneratedColumn()
  public id: number;

  @JoinColumn({ name: 'userId' })
  @OneToOne(() => User, {
    nullable: true,
  })
  public user: User;

  @Column({ nullable: true })
  public userId?: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart,{cascade:true})
  cartItems: CartItem[]

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

export default Cart;
