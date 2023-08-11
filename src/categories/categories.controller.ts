import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
  BadRequestException,
  Req,
  UploadedFile
} from '@nestjs/common';
import CategoriesService from './categories.service';
import CreateCategoryDto from './dto/createCategory.dto';
import UpdateCategoryDto from './dto/updateCategory.dto';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import FindOneParams from '../utils/findOneParams';
import FileUploadDto from './dto/fileUpload.dto';
import LocalFilesInterceptor from '../localFiles/localFiles.interceptor';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import RequestWithUser from '../authentication/requestWithUser.interface';

@Controller('categories')
@UseInterceptors(ClassSerializerInterceptor)
export default class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Get()
  @UseGuards(JwtAuthenticationGuard)
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Get(':id')
  @UseGuards(JwtAuthenticationGuard)
  getCategoryById(@Param() { id }: FindOneParams) {
    return this.categoriesService.getCategoryById(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createCategory(@Body() category: CreateCategoryDto) {
    return this.categoriesService.createCategory(category);
  }

  @Post('category-image')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'file',
      path: '/category',
      fileFilter: (request, file, callback) => {
        if (!file.mimetype.includes('image')) {
          return callback(
            new BadRequestException('Provide a valid image'),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: Math.pow(1024, 2), // 1MB
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'A new avatar for the user',
    type: FileUploadDto,
  })
  async addAvatar(
    @Req() request: RequestWithUser,
    @UploadedFile() file: any,
    @Body('id') id: number
  ) {
    return this.categoriesService.addAsset(id, {
      path: file.path,
      filename: file.originalname,
      mimetype: file.mimetype,
    });
  }

  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard)
  async updateCategory(
    @Param() { id }: FindOneParams,
    @Body() category: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(Number(id), category);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  async deleteCategory(@Param() { id }: FindOneParams) {
    return this.categoriesService.deleteCategory(Number(id));
  }
}
