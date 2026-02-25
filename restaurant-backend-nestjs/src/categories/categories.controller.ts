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
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface RequestWithUser extends Request {
  user: {
    id: number;
    email: string;
    restaurantId?: number;
    isSuperAdmin?: boolean;
  };
}

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Request() req: RequestWithUser,
  ) {
    const restaurantId = req.user.isSuperAdmin
      ? (createCategoryDto as any).restaurantId || req.user.restaurantId
      : req.user.restaurantId;

    return this.categoriesService.create(createCategoryDto, restaurantId || 0);
  }

  @Get()
  findAll(@Query('menuId') menuId?: string, @Request() req?: RequestWithUser) {
    // Public endpoint - no auth guard
    // If menuId is provided, filter by menu
    if (menuId) {
      const restaurantId = req?.user?.restaurantId || 0;
      return this.categoriesService.findByMenu(+menuId, restaurantId);
    }
    
    // Return all categories (optionally filtered by restaurant if authenticated)
    const restaurantId = req?.user?.restaurantId;
    return this.categoriesService.findAll(restaurantId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.categoriesService.findOne(+id, req.user.restaurantId || 0);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Request() req: RequestWithUser,
  ) {
    return this.categoriesService.update(
      +id,
      updateCategoryDto,
      req.user.restaurantId || 0,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() req: RequestWithUser) {
    await this.categoriesService.remove(+id, req.user.restaurantId || 0);
    return { message: 'Category deleted successfully' };
  }
}
