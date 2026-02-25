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
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    // For MVP: If you want this public (customer orders), hardcode restaurantId or get from body
    // For now, following the pattern of using JWT auth for all mutations
    // If making it public, you'd need to add restaurantId to the DTO or use a default value
    const restaurantId = req.user?.restaurantId || 1; // Default to 1 for MVP if no auth
    return this.ordersService.create(createOrderDto, restaurantId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query('status') status?: string, @Request() req?) {
    const restaurantId = req.user.restaurantId;
    return this.ordersService.findAll(restaurantId, status);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const restaurantId = req.user.restaurantId;
    return this.ordersService.findOne(id, restaurantId);
  }

  @Patch(':id/status')
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
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const restaurantId = req.user.restaurantId;
    return this.ordersService.remove(id, restaurantId);
  }
}
