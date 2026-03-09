import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { UpdateRestaurantSettingsDto } from './dto/update-restaurant-settings.dto';
import { RestaurantSettingsResponseDto } from './dto/restaurant-settings-response.dto';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import * as bcrypt from 'bcrypt';

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

  // Super Admin Methods

  /**
   * Get all restaurants (Super Admin only)
   */
  async findAll(): Promise<Restaurant[]> {
    return this.restaurantRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Create a new restaurant (Super Admin only)
   */
  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const hashedPassword = createRestaurantDto.password
      ? await bcrypt.hash(createRestaurantDto.password, 10)
      : await bcrypt.hash('default123', 10);

    const newRestaurant: Partial<Restaurant> = {
      restaurantName: createRestaurantDto.restaurantName,
      address: createRestaurantDto.address,
      contactNumber: createRestaurantDto.contactNumber,
      email: createRestaurantDto.email,
      logo: createRestaurantDto.logo || undefined,
      openingTime: createRestaurantDto.openingTime || '09:00',
      closingTime: createRestaurantDto.closingTime || '22:00',
      subscriptionStatus: createRestaurantDto.subscriptionStatus || 'inactive',
      subscriptionExpiryDate: createRestaurantDto.subscriptionExpiryDate
        ? new Date(createRestaurantDto.subscriptionExpiryDate)
        : undefined,
      password: hashedPassword,
      enableSteward: createRestaurantDto.enableSteward ?? true,
      enableHousekeeping: createRestaurantDto.enableHousekeeping ?? true,
      enableKds: createRestaurantDto.enableKds ?? true,
      enableReports: createRestaurantDto.enableReports ?? true,
    };

    const saved = await this.restaurantRepository.save(newRestaurant);
    return saved as Restaurant;
  }

  /**
   * Update restaurant details (Super Admin only)
   */
  async update(
    restaurantId: number,
    updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    const restaurant = await this.findById(restaurantId);
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${restaurantId} not found`);
    }

    // Update fields if provided
    if (updateRestaurantDto.restaurantName) {
      restaurant.restaurantName = updateRestaurantDto.restaurantName;
    }
    if (updateRestaurantDto.address) {
      restaurant.address = updateRestaurantDto.address;
    }
    if (updateRestaurantDto.contactNumber) {
      restaurant.contactNumber = updateRestaurantDto.contactNumber;
    }
    if (updateRestaurantDto.email) {
      restaurant.email = updateRestaurantDto.email;
    }
    if (updateRestaurantDto.logo) {
      restaurant.logo = updateRestaurantDto.logo;
    }
    if (updateRestaurantDto.openingTime) {
      restaurant.openingTime = updateRestaurantDto.openingTime;
    }
    if (updateRestaurantDto.closingTime) {
      restaurant.closingTime = updateRestaurantDto.closingTime;
    }
    if (updateRestaurantDto.subscriptionStatus) {
      restaurant.subscriptionStatus = updateRestaurantDto.subscriptionStatus;
    }
    if (updateRestaurantDto.subscriptionExpiryDate) {
      restaurant.subscriptionExpiryDate = new Date(
        updateRestaurantDto.subscriptionExpiryDate,
      );
    }
    if (updateRestaurantDto.password) {
      restaurant.password = await bcrypt.hash(updateRestaurantDto.password, 10);
    }

    // Update feature flags
    if (updateRestaurantDto.enableSteward !== undefined) {
      restaurant.enableSteward = updateRestaurantDto.enableSteward;
    }
    if (updateRestaurantDto.enableHousekeeping !== undefined) {
      restaurant.enableHousekeeping = updateRestaurantDto.enableHousekeeping;
    }
    if (updateRestaurantDto.enableKds !== undefined) {
      restaurant.enableKds = updateRestaurantDto.enableKds;
    }
    if (updateRestaurantDto.enableReports !== undefined) {
      restaurant.enableReports = updateRestaurantDto.enableReports;
    }

    return this.restaurantRepository.save(restaurant);
  }

  /**
   * Delete a restaurant (Super Admin only)
   */
  async remove(restaurantId: number): Promise<void> {
    const restaurant = await this.findById(restaurantId);
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${restaurantId} not found`);
    }

    await this.restaurantRepository.remove(restaurant);
  }
}

