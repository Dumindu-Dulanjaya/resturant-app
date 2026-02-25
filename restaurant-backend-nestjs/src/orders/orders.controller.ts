import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ParseIntPipe,
  Query,
  Header,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(ApiKeyGuard) // Secure public endpoint with API key
  @Throttle({ default: { limit: 10, ttl: 60000 } }) // 10 requests per 60 seconds
  create(@Req() req, @Body() createOrderDto: CreateOrderDto) {
    // restaurantId comes from ApiKeyGuard (attached to req)
    const restaurantId = req.restaurantId;
    
    // Validate items array is not empty
    if (!createOrderDto.items || createOrderDto.items.length === 0) {
      throw new BadRequestException('Order must contain at least one item');
    }

    return this.ordersService.create(createOrderDto, restaurantId);
  }

  @Get()
  @SkipThrottle() // Skip rate limiting for authenticated GET requests
  @UseGuards(JwtAuthGuard)
  @Header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  @Header('Pragma', 'no-cache')
  @Header('Expires', '0')
  findAll(@Query('status') status?: string, @Request() req?) {
    const restaurantId = req.user.restaurantId;
    return this.ordersService.findAll(restaurantId, status);
  }

  @Get(':id')
  @SkipThrottle() // Skip rate limiting for authenticated requests
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const restaurantId = req.user.restaurantId;
    return this.ordersService.findOne(id, restaurantId);
  }

  @Patch(':id/status')
  @SkipThrottle() // Skip rate limiting for authenticated requests
  @UseGuards(JwtAuthGuard)
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
    @Request() req,
  ) {
    const restaurantId = req.user.restaurantId;
    return this.ordersService.updateStatus(id, updateOrderStatusDto, restaurantId);
  }

  @Delete(':id')
  @SkipThrottle() // Skip rate limiting for authenticated requests
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const restaurantId = req.user.restaurantId;
    return this.ordersService.remove(id, restaurantId);
  }
}
