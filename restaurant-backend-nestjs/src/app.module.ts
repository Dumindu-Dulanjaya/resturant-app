import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { MenusModule } from './menus/menus.module';
import { CategoriesModule } from './categories/categories.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { FoodItemsModule } from './food-items/food-items.module';
import { OrdersModule } from './orders/orders.module';
import { TableQrModule } from './table-qr/table-qr.module';
import { ReportsModule } from './reports/reports.module';
import { RoomQrModule } from './room-qr/room-qr.module';
import { HousekeepingModule } from './housekeeping/housekeeping.module';
import { OffersModule } from './offers/offers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000, // 60 seconds
      limit: 10, // 10 requests per 60 seconds per IP
    }]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // Set to false in production
        logging: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    RestaurantsModule,
    MenusModule,
    CategoriesModule,
    SubcategoriesModule,
    FoodItemsModule,
    OrdersModule,
    TableQrModule,
    ReportsModule,
    RoomQrModule,
    HousekeepingModule,
    OffersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
