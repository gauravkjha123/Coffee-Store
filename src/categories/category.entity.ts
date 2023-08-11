import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import Product from '../product/product.entity';
import LocalFile from '../localFiles/localFile.entity';

@Entity()
class Category {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column({ nullable: true })
  public description: string;

  @OneToMany(() => Product, (product: Product) => product.category)
  public product: Product[];

  @JoinColumn({ name: 'categoryId' })
  @OneToOne(() => LocalFile, {
    nullable: true,
  })
  public category?: LocalFile;

  @Column({ nullable: true })
  public categoryId?: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

export default Category;
