import { Column, Entity, PrimaryGeneratedColumn,OneToOne } from 'typeorm';
import Store from '../store/store.entity'

@Entity()
class Address {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public street: string;

  @Column()
  public city: string;

  @Column()
  public longitude: string;

  @Column()
  public latitude: string;

  @Column()
  public country: string;

  @OneToOne(() => Store, (store: Store) => store.address)
  store: Store;
}

export default Address;
