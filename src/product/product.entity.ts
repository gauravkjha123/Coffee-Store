import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
  ManyToMany
} from 'typeorm';
import Category from '../categories/category.entity';
import Store from '../store/store.entity';
import LocalFile from '../localFiles/localFile.entity';

@Entity()
class Product {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;
  
  @Column({ nullable: false,default:0})
  public points: number;

  @Column({ nullable: true })
  public description: string;

  @Column({ nullable: true })
  public productId?: number;

  @Column()
  public price: number;

  @ManyToOne(() => Category, (category: Category) => category.product)
  category: Category;

  @JoinColumn({ name: 'productId' })
  @OneToOne(() => LocalFile, {
    nullable: true,
  })
  public product?: LocalFile;

  @ManyToMany(() => Store, (stores) => stores.products)
  stores: Store[]

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

export default Product;
