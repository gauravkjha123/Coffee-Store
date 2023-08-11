import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
  BadRequestException,
  UploadedFile,
} from '@nestjs/common';
import ProductService from './product.service';
import CreatePostDto from './dto/createProduct.dto';
import UpdatePostDto from './dto/updateproduct.dto';
import FindOneParams from '../utils/findOneParams';
import { PaginationParams } from '../utils/types/paginationParams';
import {
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import LocalFilesInterceptor from '../localFiles/localFiles.interceptor';
import FileUploadDto from './dto/fileUpload.dto';

@Controller('product')
@ApiTags('product')
@UseInterceptors(ClassSerializerInterceptor)
export default class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  async getProducts(
    @Query('search') search: string,
    @Query() { offset, limit, startId }: PaginationParams,
  ) {
    return this.productService.getProducts(offset, limit, search, startId);
  }


  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a product that exists in the database',
    type: Number,
  })
  @ApiResponse({
    status: 404,
    description: 'A product with given id does not exist.',
  })
  @UseGuards(JwtAuthenticationGuard)
  getProductById(@Param() { id }: FindOneParams) {
    return this.productService.getProductById(Number(id));
  }

  @Post('Category')
  @UseGuards(JwtAuthenticationGuard)
  async getProductsByCategory( @Body() Category:string ) {
    return this.productService.getProductsByCategory(Category);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createProduct(@Body() product: CreatePostDto) {
    return this.productService.createProduct(product);
  }

  @Post('product-image')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'file',
      path: '/product',
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
  async addAvatar(@UploadedFile() file: any, @Body('id') id: number) {
    return this.productService.addAsset(id, {
      path: file.path,
      filename: file.originalname,
      mimetype: file.mimetype,
    });
  }

  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard)
  async updateProduct(
    @Param() { id }: FindOneParams,
    @Body() product: UpdatePostDto,
  ) {
    return this.productService.updateProduct(Number(id), product);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  async deleteProduct(@Param() { id }: FindOneParams) {
    return this.productService.deleteProduct(Number(id));
  }
}
