import {
  Controller,
  Get,
  Patch,
  Body,
  UseGuards,
  Request,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { UpdateRestaurantSettingsDto } from './dto/update-restaurant-settings.dto';
import { RestaurantSettingsResponseDto } from './dto/restaurant-settings-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/enums/role.enum';

@Controller('restaurant')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get('settings')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  async getSettings(
    @Request() req,
  ): Promise<{ success: boolean; data: RestaurantSettingsResponseDto }> {
    const restaurantId = req.user.restaurantId;
    const settings = await this.restaurantsService.getSettings(restaurantId);
    return {
      success: true,
      data: settings,
    };
  }

  @Patch('settings')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  async updateSettings(
    @Request() req,
    @Body() updateDto: UpdateRestaurantSettingsDto,
  ): Promise<{ success: boolean; data: RestaurantSettingsResponseDto; message: string }> {
    const restaurantId = req.user.restaurantId;
    const settings = await this.restaurantsService.updateSettings(
      restaurantId,
      updateDto,
    );
    return {
      success: true,
      data: settings,
      message: 'Restaurant settings updated successfully',
    };
  }
}
