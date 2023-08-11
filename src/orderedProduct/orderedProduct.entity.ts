import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,

} from 'typeorm';
import Product from '../product/product.entity';
import Order from '../order/order.entity';
import Store from '../store/store.entity';

@Entity()
class OrderedProduct {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: false,default:0 })
  public totalQuantity: number;

  @Column({ nullable: false,default:0 })
  public totalAmount: number;

  @Column({ type: 'timestamp',nullable:true  })
  public orderDeliveryDate: Date;

  @Column({ type: 'timestamp' ,nullable:true  })
  public orderDeliveredDate: Date;

  @JoinColumn({ name: 'orderId' })
  @ManyToOne(() => Order, (order)=>order.orderedProduct)
  public order: Order;

  @Column({ nullable: true })
  public orderId?: number;

  @JoinColumn({ name: 'productId' })
  @ManyToOne(() => Product,{nullable:true})
  public product: Product;

  @JoinColumn({ name: 'storeId' })
  @ManyToOne(() => Store, {
    nullable: true,
  })
  public store: Store;

  @Column({ nullable: true })
  public productId?: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

export default OrderedProduct;
