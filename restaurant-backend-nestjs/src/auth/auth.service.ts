import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Admin } from './entities/admin.entity';
import { SuperAdmin } from './entities/super-admin.entity';
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
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

  /**
   * Create a new admin (Super Admin only)
   */
  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    // Check if email already exists
    const existingAdmin = await this.adminRepository.findOne({
      where: { email: createAdminDto.email },
    });

    if (existingAdmin) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);

    // Create admin
    const admin = this.adminRepository.create({
      email: createAdminDto.email,
      password: hashedPassword,
      role: createAdminDto.role,
      restaurantId: createAdminDto.restaurantId,
    });

    return this.adminRepository.save(admin);
  }

  /**
   * Get all admins (Super Admin only)
   */
  async getAllAdmins(): Promise<Admin[]> {
    return this.adminRepository.find({
      relations: ['restaurant'],
      order: { adminId: 'DESC' },
    });
  }

  async deleteAdmin(adminId: number): Promise<void> {
    await this.adminRepository.delete(adminId);
  }

  /**
   * Change password for authenticated user
   */
  async changePassword(
    userId: number,
    type: 'admin' | 'super_admin',
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    if (type === 'admin') {
      const admin = await this.adminRepository.findOne({
        where: { adminId: userId },
      });

      if (!admin) {
        throw new UnauthorizedException('User not found');
      }

      // Verify current password
      const hashToCompare = admin.password.replace(/^\$2y\$/, '$2a$');
      const isPasswordValid = await bcrypt.compare(currentPassword, hashToCompare);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Current password is incorrect');
      }

      // Hash and update new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      admin.password = hashedPassword;
      await this.adminRepository.save(admin);
    } else {
      const superAdmin = await this.superAdminRepository.findOne({
        where: { superAdminId: userId },
      });

      if (!superAdmin) {
        throw new UnauthorizedException('User not found');
      }

      // Verify current password
      const hashToCompare = superAdmin.password.replace(/^\$2y\$/, '$2a$');
      const isPasswordValid = await bcrypt.compare(currentPassword, hashToCompare);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Current password is incorrect');
      }

      // Hash and update new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      superAdmin.password = hashedPassword;
      await this.superAdminRepository.save(superAdmin);
    }
  }

  /**
   * Update profile for authenticated user
   */
  async updateProfile(
    userId: number,
    type: 'admin' | 'super_admin',
    email?: string,
    name?: string,
  ): Promise<Admin | SuperAdmin> {
    if (type === 'admin') {
      const admin = await this.adminRepository.findOne({
        where: { adminId: userId },
      });

      if (!admin) {
        throw new UnauthorizedException('User not found');
      }

      if (email && email !== admin.email) {
        // Check if new email already exists
        const existingAdmin = await this.adminRepository.findOne({
          where: { email },
        });

        if (existingAdmin && existingAdmin.adminId !== userId) {
          throw new ConflictException('Email already in use');
        }

        admin.email = email;
      }

      return this.adminRepository.save(admin);
    } else {
      const superAdmin = await this.superAdminRepository.findOne({
        where: { superAdminId: userId },
      });

      if (!superAdmin) {
        throw new UnauthorizedException('User not found');
      }

      if (email && email !== superAdmin.email) {
        // Check if new email already exists
        const existingSuperAdmin = await this.superAdminRepository.findOne({
          where: { email },
        });

        if (existingSuperAdmin && existingSuperAdmin.superAdminId !== userId) {
          throw new ConflictException('Email already in use');
        }

        superAdmin.email = email;
      }

      if (name) {
        superAdmin.name = name;
      }

      return this.superAdminRepository.save(superAdmin);
    }
  }
}
