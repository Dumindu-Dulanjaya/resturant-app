import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  async getStats(@Request() req) {
    const user = req.user;
    
    // Super admin can see all stats, admin only sees their restaurant
    const restaurantId = user.type === 'super_admin' ? undefined : user.id;
    
    return this.dashboardService.getStats(restaurantId);
  }
}
