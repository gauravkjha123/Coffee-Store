import { Injectable, Logger } from '@nestjs/common';
import CreateStoreDto from './dto/createStore.dto';
import Store from './store.entity';
import UpdateStoretDto from './dto/updateStore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import LocalFilesService from '../localFiles/localFiles.service';
import ProductService from '../product/product.service';
import StoreNotFoundException from './exceptions/storeNotFound.exception';
import { MoreThan, FindManyOptions } from 'typeorm';

@Injectable()
export default class StoreService {
  private readonly logger = new Logger(StoreService.name);

  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
    private localFilesService: LocalFilesService,
    private productService: ProductService,
    
  ) {}

  async getStores(
    offset?: number,
    limit?: number,
    searchStr?: string,
    startId?: number,
    options?: FindManyOptions<Store>,
  ) {
    const where: FindManyOptions<Store>['where'] = {};
    let separateCount = 0;
    if (startId) {
      where.id = MoreThan(startId);
      if (searchStr) {
        where.name = searchStr;
      }
      separateCount = await this.storeRepository.count();
    }

    const [items, count] = await this.storeRepository.findAndCount({
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
    const asset = await this.localFilesService.saveLocalFileData(fileData);
    await this.storeRepository.update(id, {
      storeImageId: asset.id,
    });
    return asset;
  }

  async getStoreById(id: number) {
    try {
      const store = await this.storeRepository.findOne({
        where: { id },
        relations: {
          products: true,
          address:true
        },
      });
      if (store) {
        return store;
      }
      this.logger.warn('Tried to access a store that does not exist');
      throw new StoreNotFoundException(id);
    } catch (error) {
      throw error
    }
  }

  async createStore(store: CreateStoreDto) {
    const newStore = this.storeRepository.create({
      ...store,
    });
    await this.storeRepository.save(newStore);
    return newStore;
  }

  async addProducts(id: number,productsIds: number[]) {
      let store=await this.storeRepository.findOne({where:{id}});
      if (!store) {
        throw new StoreNotFoundException(id);
      }
      let products=await this.productService.getProductsByIds(productsIds);
        store.products=products;
        await this.storeRepository.save(store);
        return this.storeRepository.findOne({where:{id}});
  }

  async updateStore(id: number, store: UpdateStoretDto) {
    await this.storeRepository.update(id, store);
    const updatedSore = await this.storeRepository.findOne({
      where: {
        id,
      },
      relations: {
        products: true,
        address:true
      },
    });
    if (updatedSore) {
      return updatedSore;
    }
    throw new StoreNotFoundException(id);
  }

  async deleteStore(id: number) {
    const deleteResponse = await this.storeRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new StoreNotFoundException(id);
    }
    return deleteResponse;
  }
}
