import { Injectable, Logger ,HttpException, HttpStatus} from '@nestjs/common';
import CreateProductDto from './dto/createProduct.dto';
import Product from './product.entity';
import UpdateProductDto from './dto/updateproduct.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import LocalFilesService from '../localFiles/localFiles.service';
import ProductNotFoundException from './exceptions/productNotFound.exception';
import { MoreThan, FindManyOptions } from 'typeorm';

@Injectable()
export default class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private localFilesService: LocalFilesService,
  ) {}

  async getProducts(
    offset?: number,
    limit?: number,
    searchStr?: string,
    startId?: number,
    options?: FindManyOptions<Product>,
  ) {
    const where: FindManyOptions<Product>['where'] = {};
    let separateCount = 0;
    if (startId) {
      where.id = MoreThan(startId);
      if (searchStr) {
        where.name = searchStr;
      }
      separateCount = await this.productRepository.count();
    }

    const [items, count] = await this.productRepository.findAndCount({
      where,
      order: {
        id: 'ASC',
      },
      skip: offset,
      take: limit,
      ...options,
    });

    return {
      items,
      count: startId ? separateCount : count,
    };
  }

  async addAsset(id: number, fileData: LocalFileDto) {
    let product =await this.getProductById(id);
    const asset = await this.localFilesService.saveLocalFileData(fileData);
    await this.productRepository.update(product.id, {
      productId: asset.id,
    });
    return asset;
  }

  async getProductById(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        category: true,
        stores:true
      },
    });
    if (product) {
      return product;
    }
    this.logger.warn('Tried to access a product that does not exist');
    throw new ProductNotFoundException(id);
  }

  async getProductsByCategory(category: string) {
    const products = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('category.name = :categoryName', { categoryName: category })
      .getOne();
  
    if (products) {
      return products;
    }
    this.logger.warn('Tried to access a product with this category does not exist');
    throw new HttpException("Tried to access a product with this category does not exist",HttpStatus.NOT_FOUND);
  }

  async getProductsByIds(ids: number[]):Promise<Product[]> {
    const products = await this.productRepository.find({
      where: { id: In(ids) }, // Use the "In" operator to filter products with IDs in the provided array
      relations: {
        category: true,
      },
    });
  
    if (products.length > 0) {
      return products;
    }
  
    // If no products are found for any of the provided IDs, throw a ProductNotFoundException
    this.logger.warn('Tried to access products that do not exist');
    throw new ProductNotFoundException(ids[0]);
  }

  async createProduct(product: CreateProductDto) {
    const newproduct = this.productRepository.create({
      ...product,
    });
    await this.productRepository.save(newproduct);
    return newproduct;
  }

  async updateProduct(id: number, product: UpdateProductDto) {
    await this.productRepository.update(id, product);
    const updatedProduct = await this.productRepository.findOne({
      where: {
        id,
      },
      relations: {
        category: true,
      },
    });
    if (updatedProduct) {
      return updatedProduct;
    }
    throw new ProductNotFoundException(id);
  }

  async deleteProduct(id: number) {
    const deleteResponse = await this.productRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new ProductNotFoundException(id);
    }
    return deleteResponse;
  }
}
