import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Admin } from './entities/admin.entity';
import { SuperAdmin } from './entities/super-admin.entity';
import { LoginDto } from './dto/login.dto';
import { AuthResponse, JwtPayload } from './interfaces/auth.interface';
import { Restaurant } from '../restaurants/entities/restaurant.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    @InjectRepository(SuperAdmin)
    private superAdminRepository: Repository<SuperAdmin>,
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { email, password } = loginDto;

    // First, check if super admin (higher priority)
    const superAdmin = await this.superAdminRepository.findOne({
      where: { email },
    });

    if (superAdmin) {
      // Verify password - handle PHP's $2y$ bcrypt format by converting to $2a$
      const hashToCompare = superAdmin.password.replace(/^\$2y\$/, '$2a$');
      const isPasswordValid = await bcrypt.compare(password, hashToCompare);
      
      if (!isPasswordValid) {
        return {
          success: false,
          message: 'Invalid password.',
        };
      }

      // Generate JWT token
      const payload: JwtPayload = {
        userId: superAdmin.superAdminId,
        email: superAdmin.email,
        role: 'super_admin',
        type: 'super_admin',
      };

      const access_token = this.jwtService.sign(payload);

      return {
        success: true,
        message: 'Super Admin login successful.',
        data: {
          access_token,
          user: {
            id: superAdmin.superAdminId,
            email: superAdmin.email,
            role: 'super_admin',
            type: 'super_admin',
          },
        },
      };
    }

    // If not super admin, try admin
    const admin = await this.adminRepository.findOne({
      where: { email },
      relations: ['restaurant'],
    });

    if (admin) {
      // Verify password - handle PHP's $2y$ bcrypt format by converting to $2a$
      const hashToCompare = admin.password.replace(/^\$2y\$/, '$2a$');
      const isPasswordValid = await bcrypt.compare(password, hashToCompare);
      
      if (!isPasswordValid) {
        return {
          success: false,
          message: 'Invalid password.',
        };
      }

      // Check if restaurant subscription is active (for non-housekeeper roles)
      if (admin.role !== 'housekeeper' && admin.restaurant) {
        if (admin.restaurant.subscriptionStatus !== 'active') {
          return {
            success: false,
            message: 'Your subscription is inactive. Please contact support.',
          };
        }

        // Check subscription expiry
        const now = new Date();
        const expiryDate = new Date(admin.restaurant.subscriptionExpiryDate);
        if (expiryDate < now) {
          return {
            success: false,
            message: 'Your subscription has expired. Please renew your subscription.',
          };
        }
      }

      // Generate JWT token
      const payload: JwtPayload = {
        userId: admin.adminId,
        email: admin.email,
        role: admin.role,
        restaurantId: admin.restaurantId,
        type: 'admin',
      };

      const access_token = this.jwtService.sign(payload);

      return {
        success: true,
        message: 'Login successful.',
        data: {
          access_token,
          user: {
            id: admin.adminId,
            email: admin.email,
            role: admin.role,
            restaurantId: admin.restaurantId,
            type: 'admin',
          },
        },
      };
    }

    // No user found
    return {
      success: false,
      message: 'No account found with this email.',
    };
  }

  async validateUser(userId: number, type: 'admin' | 'super_admin') {
    if (type === 'admin') {
      const admin = await this.adminRepository.findOne({
        where: { adminId: userId },
        relations: ['restaurant'],
      });
      return admin;
    } else {
      const superAdmin = await this.superAdminRepository.findOne({
        where: { superAdminId: userId },
      });
      return superAdmin;
    }
  }
}
