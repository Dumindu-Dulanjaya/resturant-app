import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HousekeepingRequest } from './entities/housekeeping-request.entity';
import { HousekeepingService } from './housekeeping.service';
import {
  HousekeepingPublicController,
  HousekeepingAdminController,
} from './housekeeping.controller';
import { RoomQrModule } from '../room-qr/room-qr.module';
import { RestaurantsModule } from '../restaurants/restaurants.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([HousekeepingRequest]),
    RoomQrModule, // For room key validation
    RestaurantsModule, // For FeatureFlagGuard
  ],
  controllers: [HousekeepingPublicController, HousekeepingAdminController],
  providers: [HousekeepingService],
  exports: [HousekeepingService],
})
export class HousekeepingModule {}
