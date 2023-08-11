import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  AfterLoad
} from 'typeorm';
import Cart from '../cart/cart.entity';
import Product from '../product/product.entity';
import Store from '../store/store.entity';

@Entity()
class CartItem {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: false,default:0 })
  public totalQuantity: number;

  @Column({ nullable: false,default:0 })
  public totalAmount: number;

  @JoinColumn({ name: 'productId' })
  @ManyToOne(() => Product, {
    nullable: true,
  })
  public product: Product;

  @Column({ nullable: true })
  public productId?: number;

  @JoinColumn({ name: 'storeId' })
  @ManyToOne(() => Store, {
    nullable: true,
  })
  public store: Store;

  @Column({ nullable: true })
  public storeId?: number;
  
  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  cart:Cart

  @Column({ nullable: true })
  public cartId?: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @AfterLoad()
  public async chnageTotalPrice(instance:CartItem){
    this.totalAmount=this.totalQuantity*this.product.price;
  }
}

export default CartItem;
