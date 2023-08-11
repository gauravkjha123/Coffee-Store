import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
  JoinTable
} from 'typeorm';
import Address from '../address/address.entity';
import Product from '../product/product.entity';
import LocalFile from '../localFiles/localFile.entity';

@Entity()
class Store {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column({ nullable: true })
  public description: string;

  @Column({ nullable: true })
  public storeImageId?: number;

  @Column({ nullable: true })
  public addressId?: number;

  @Column({ nullable: true })
  public phoneNumber?: string;

  @JoinColumn({ name: 'addressId' })
  @OneToOne(() => Address, (address: Address) => address.store)
  address: Address;

  @JoinColumn({ name: 'storeImageId' })
  @OneToOne(() => LocalFile, {
    nullable: true,
  })
  public storeImage?: LocalFile;

  @ManyToMany(() => Product, (products) => products.stores)
  @JoinTable()
  products: Product[]

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

export default Store;
