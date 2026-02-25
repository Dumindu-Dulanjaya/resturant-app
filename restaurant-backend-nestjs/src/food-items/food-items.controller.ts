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
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { FoodItemsService } from './food-items.service';
import { CreateFoodItemDto } from './dto/create-food-item.dto';
import { UpdateFoodItemDto } from './dto/update-food-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('food-items')
export class FoodItemsController {
  constructor(private readonly foodItemsService: FoodItemsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createFoodItemDto: CreateFoodItemDto, @Request() req) {
    const restaurantId = req.user.restaurantId;
    return this.foodItemsService.create(createFoodItemDto, restaurantId);
  }

  @Get()
  findAll(
    @Query('menuId') menuId?: string,
    @Query('categoryId') categoryId?: string,
    @Query('subcategoryId') subcategoryId?: string,
    @Query('search') search?: string,
  ) {
    const filters: any = {};

    if (menuId) {
      filters.menuId = parseInt(menuId);
    }

    if (categoryId) {
      filters.categoryId = parseInt(categoryId);
    }

    if (subcategoryId) {
      filters.subcategoryId = parseInt(subcategoryId);
    }

    if (search) {
      filters.search = search;
    }

    // Public endpoint - no restaurant filter for now
    // In production, you might want to add restaurant context
    return this.foodItemsService.findAll(undefined, filters);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const restaurantId = req.user.restaurantId;
    return this.foodItemsService.findOne(id, restaurantId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFoodItemDto: UpdateFoodItemDto,
    @Request() req,
  ) {
    const restaurantId = req.user.restaurantId;
    return this.foodItemsService.update(id, updateFoodItemDto, restaurantId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const restaurantId = req.user.restaurantId;
    return this.foodItemsService.remove(id, restaurantId);
  }
}
