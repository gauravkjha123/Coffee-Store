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
  import StoreService from './store.service';
  import CreateStoreDto from './dto/createStore.dto';
  import AddProducteDto from './dto/addProduct.dto';
  import UpdateStoreDto from './dto/updateStore.dto';
  import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
  import FindOneParams from '../utils/findOneParams';
  import FileUploadDto from './dto/fileUpload.dto';
  import LocalFilesInterceptor from '../localFiles/localFiles.interceptor';
  import { ApiBody, ApiConsumes } from '@nestjs/swagger';
  import RequestWithUser from '../authentication/requestWithUser.interface';
  
  @Controller('store')
  @UseInterceptors(ClassSerializerInterceptor)
  export default class StoreController {
    constructor(private readonly storeService: StoreService) {}
    @Get()
    @UseGuards(JwtAuthenticationGuard)
    getAllStore() {
      return this.storeService.getStores();
    }
  
    @Get(':id')
    @UseGuards(JwtAuthenticationGuard)
    getStoreById(@Param() { id }: FindOneParams) {
      return this.storeService.getStoreById(Number(id));
    }
  
    @Post()
    @UseGuards(JwtAuthenticationGuard)
    async createStore(@Body() Store: CreateStoreDto) {
      return this.storeService.createStore(Store);
    }

    @Post('add-product/:id')
    @UseGuards(JwtAuthenticationGuard)
    async addProduct( @Param() { id }: FindOneParams,@Body() body: AddProducteDto) {
      return this.storeService.addProducts(Number(id), body.products);
    }
  
    @Post('store-image')
    @UseGuards(JwtAuthenticationGuard)
    @UseInterceptors(
      LocalFilesInterceptor({
        fieldName: 'file',
        path: '/store',
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
      return this.storeService.addAsset(id, {
        path: file.path,
        filename: file.originalname,
        mimetype: file.mimetype,
      });
    }
  
    @Patch(':id')
    @UseGuards(JwtAuthenticationGuard)
    async updateStore(
      @Param() { id }: FindOneParams,
      @Body() Store: UpdateStoreDto,
    ) {
      return this.storeService.updateStore(Number(id), Store);
    }
  
    @Delete(':id')
    @UseGuards(JwtAuthenticationGuard)
    async deleteStore(@Param() { id }: FindOneParams) {
      return this.storeService.deleteStore(Number(id));
    }
  }
  