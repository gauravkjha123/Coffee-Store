import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany

} from 'typeorm';
import User from '../users/user.entity';
import OrderStatus from './enum/order.status.enum';
import OrderedProduct from '../orderedProduct/orderedProduct.entity';

@Entity()
class Order {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: false,default:0 })
  public totalQuantity: number;

  @Column({ nullable: false,default:0 })
  public totalAmount: number;

  @Column( {
    type:'enum',
    enum:OrderStatus,
    default:OrderStatus.PENDING

  })
  public status: OrderStatus;

  @Column({ type: 'timestamp',nullable:true  })
  public orderDeliveryDate: Date;

  @Column({ type: 'timestamp',nullable:true })
  public orderDeliveredDate: Date;

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => User, {
    nullable: true,
  })
  public user: User;

  @Column({ nullable: true })
  public userId?: number;


  @OneToMany(() => OrderedProduct, (orderedProduct) => orderedProduct.order)
  orderedProduct: OrderedProduct[]

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

export default Order;
