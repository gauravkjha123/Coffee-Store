import { Injectable } from '@nestjs/common';
import CreateCategoryDto from './dto/createCategory.dto';
import Category from './category.entity';
import UpdateCategoryDto from './dto/updateCategory.dto';
import LocalFilesService from '../localFiles/localFiles.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { In } from 'typeorm';

import CategoryNotFoundException from './exceptions/categoryNotFound.exception';

@Injectable()
export default class CategoriesService {
  /**
   * @ignore
   */
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    private localFilesService: LocalFilesService,
  ) {}

  /**
   * A method that fetches the categories from the database
   * @returns A promise with the list of categories
   */
  getAllCategories(): Promise<Category[]> {
    return this.categoriesRepository.find({
      relations: {
        product: true,
      },
    });
  }

  /**
   * A method that fetches a category with a given id. Example:
   *
   * @example
   * const category = await categoriesService.getCategoryById(1);
   */
  async getCategoryById(id: number): Promise<Category> {
    const category = await this.categoriesRepository.findOne({
      where: {
        id,
      },
      relations: {
        product: true,
      },
    });
    if (category) {
      return category;
    }
    throw new CategoryNotFoundException(id);
  }

  async getCategoryByIds(ids: number[]): Promise<Category[]> {
    const category = await this.categoriesRepository.find({
      where: {
        id: In(ids),
      },
      relations: {
        product: true,
      },
    });
    if (category) {
      return category;
    }
    return undefined;
  }

  async restoreDeletedCategory(id: number) {
    const restoreResponse = await this.categoriesRepository.restore(id);
    if (!restoreResponse.affected) {
      throw new CategoryNotFoundException(id);
    }
  }

  async addAsset(id: number, fileData: LocalFileDto) {
    let Category=await this.getCategoryById(id);
    const asset = await this.localFilesService.saveLocalFileData(fileData);
    await this.categoriesRepository.update(Category.id, {
      categoryId: asset.id,
    });
    return asset;
  }

  async createCategory(category: CreateCategoryDto) {
    const newCategory = await this.categoriesRepository.create(category);
    await this.categoriesRepository.save(newCategory);
    return newCategory;
  }

  /**
   * See the [definition of the UpdateCategoryDto file]{@link UpdateCategoryDto} to see a list of required properties
   */
  async updateCategory(
    id: number,
    category: UpdateCategoryDto,
  ): Promise<Category> {
    await this.categoriesRepository.update(id, category);
    const updatedCategory = await this.categoriesRepository.findOne({
      where: {
        id,
      },
      relations: {
        product: true,
      },
    });
    if (updatedCategory) {
      return updatedCategory;
    }
    throw new CategoryNotFoundException(id);
  }

  /**
   * @deprecated Use deleteCategory instead
   */
  async deleteCategoryById(id: number): Promise<void> {
    return this.deleteCategory(id);
  }

  /**
   * A method that deletes a category from the database
   * @param id An id of a category. A category with this id should exist in the database
   */
  async deleteCategory(id: number): Promise<any> {
    const deleteResponse = await this.categoriesRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new CategoryNotFoundException(id);
    }
    return deleteResponse;
  }
}
