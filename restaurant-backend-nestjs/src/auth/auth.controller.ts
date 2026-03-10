import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Patch,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { UserRole } from './enums/role.enum';
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

  @Post('admin/create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @HttpCode(HttpStatus.CREATED)
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    const admin = await this.authService.createAdmin(createAdminDto);
    return {
      success: true,
      data: admin,
      message: 'Admin created successfully',
    };
  }

  @Get('admins')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  async getAllAdmins() {
    const admins = await this.authService.getAllAdmins();
    return {
      success: true,
      data: admins,
    };
  }

  @Delete('admins/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  async deleteAdmin(@Param('id') id: string) {
    await this.authService.deleteAdmin(parseInt(id));
    return { success: true, message: 'Admin deleted successfully' };
  }

  @Patch('change-password')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @Request() req,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    await this.authService.changePassword(
      req.user.userId,
      req.user.type,
      changePasswordDto.currentPassword,
      changePasswordDto.newPassword,
    );

    return {
      success: true,
      message: 'Password changed successfully',
    };
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async updateProfile(
    @Request() req,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const updatedUser = await this.authService.updateProfile(
      req.user.userId,
      req.user.type,
      updateProfileDto.email,
      updateProfileDto.name,
    );

    return {
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser,
    };
  }
}
