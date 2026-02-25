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
import { SubcategoriesService } from './subcategories.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSubcategoryDto: CreateSubcategoryDto, @Request() req) {
    const restaurantId =
      req.user.role === 'super_admin' ? null : req.user.restaurantId;
    return this.subcategoriesService.create(createSubcategoryDto, restaurantId);
  }

  @Get()
  findAll(@Query('categoryId') categoryId?: string) {
    // Public endpoint - returns all subcategories or filtered by categoryId
    const categoryIdNum = categoryId ? parseInt(categoryId, 10) : undefined;
    return this.subcategoriesService.findAll(undefined, categoryIdNum);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const restaurantId =
      req.user.role === 'super_admin' ? null : req.user.restaurantId;
    return this.subcategoriesService.findOne(+id, restaurantId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubcategoryDto: UpdateSubcategoryDto,
    @Request() req,
  ) {
    const restaurantId =
      req.user.role === 'super_admin' ? null : req.user.restaurantId;
    return this.subcategoriesService.update(+id, updateSubcategoryDto, restaurantId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const restaurantId =
      req.user.role === 'super_admin' ? null : req.user.restaurantId;
    return this.subcategoriesService.remove(+id, restaurantId);
  }
}
