import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { EmailConfirmationModule } from './emailConfirmation/emailConfirmation.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';
import HealthModule from './health/health.module';
// import { FireBaseModule } from './firebase/firebase.module';
import { LocalFilesModule } from './localFiles/localFiles.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductModule } from './product/product.module';
import { StoreModule } from './store/store.module';
import { AddressModule } from './address/address.module';
import { CartModule } from './cart/cart.module';
import { CartItemModule } from './cartItem/cartItem.module';
import { OrderModule } from './order/order.module';
import { OrderedProductModule } from './orderedProduct/orderedProduct.module';
import { PointManagementModule } from './pointManagement/pointManagement.module';
import { RewardModule } from './reward/reward.module';
import { RewardManagementModule } from './rewardManagement/rewardManagement.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    // FireBaseModule,
    AuthenticationModule,
    ConfigModule.forRoot(),
    EmailConfirmationModule,
    LoggerModule,
    HealthModule,
    LocalFilesModule,
    CategoriesModule,
    ProductModule,
    StoreModule,
    AddressModule,
    CartModule,
    CartItemModule,
    OrderModule,
    OrderedProductModule,
    PointManagementModule,
    RewardModule,
    RewardManagementModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
