import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { UpdateRestaurantSettingsDto } from './dto/update-restaurant-settings.dto';
import { RestaurantSettingsResponseDto } from './dto/restaurant-settings-response.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async findByApiKey(apiKey: string): Promise<Restaurant | null> {
    return this.restaurantRepository.findOne({ where: { apiKey } });
  }

  async findById(restaurantId: number): Promise<Restaurant | null> {
    return this.restaurantRepository.findOne({ where: { restaurantId } });
  }

  async getSettings(restaurantId: number): Promise<RestaurantSettingsResponseDto> {
    const restaurant = await this.findById(restaurantId);
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    return {
      enableSteward: restaurant.enableSteward,
      enableHousekeeping: restaurant.enableHousekeeping,
      enableKds: restaurant.enableKds,
      enableReports: restaurant.enableReports,
    };
  }

  async updateSettings(
    restaurantId: number,
    updateDto: UpdateRestaurantSettingsDto,
  ): Promise<RestaurantSettingsResponseDto> {
    const restaurant = await this.findById(restaurantId);
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    // Update only provided fields
    if (updateDto.enableSteward !== undefined) {
      restaurant.enableSteward = updateDto.enableSteward;
    }
    if (updateDto.enableHousekeeping !== undefined) {
      restaurant.enableHousekeeping = updateDto.enableHousekeeping;
    }
    if (updateDto.enableKds !== undefined) {
      restaurant.enableKds = updateDto.enableKds;
    }
    if (updateDto.enableReports !== undefined) {
      restaurant.enableReports = updateDto.enableReports;
    }

    await this.restaurantRepository.save(restaurant);

    return {
      enableSteward: restaurant.enableSteward,
      enableHousekeeping: restaurant.enableHousekeeping,
      enableKds: restaurant.enableKds,
      enableReports: restaurant.enableReports,
    };
  }
}

