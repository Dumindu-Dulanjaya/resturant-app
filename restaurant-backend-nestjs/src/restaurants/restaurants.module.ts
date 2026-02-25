import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';

@Module({
  providers: [RestaurantsService]
})
export class RestaurantsModule {}
