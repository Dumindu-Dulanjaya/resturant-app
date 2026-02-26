import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthResponse } from './interfaces/auth.interface';
import { RestaurantsService } from '../restaurants/restaurants.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly restaurantsService: RestaurantsService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    const user = await this.authService.validateUser(
      req.user.userId,
      req.user.type,
    );

    // Get restaurant settings if user has a restaurantId
    let restaurantSettings: any = null;
    if (req.user.restaurantId) {
      try {
        restaurantSettings = await this.restaurantsService.getSettings(
          req.user.restaurantId,
        );
      } catch (error) {
        // If restaurant not found, set default settings
        restaurantSettings = {
          enableSteward: true,
          enableHousekeeping: true,
          enableKds: true,
          enableReports: true,
        };
      }
    }
    
    return {
      success: true,
      data: {
        id: req.user.userId,
        email: req.user.email,
        role: req.user.role,
        restaurantId: req.user.restaurantId,
        type: req.user.type,
        restaurantSettings,
        ...user,
      },
    };
  }
}
