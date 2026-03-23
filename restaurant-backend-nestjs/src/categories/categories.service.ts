import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) { }

  async create(
    createCategoryDto: CreateCategoryDto,
    restaurantId: number,
  ): Promise<Category> {
    const category = this.categoriesRepository.create({
      ...createCategoryDto,
      restaurantId,
    });

    return await this.categoriesRepository.save(category);
  }

  async findAll(restaurantId?: number): Promise<Category[]> {
    const where = restaurantId ? { restaurantId } : {};
    const categories = await this.categoriesRepository.find({
      where,
      relations: ['menu'],
      order: { categoryId: 'DESC' },
    });

    // Add API URL prefix to image URLs
    return categories.map((category) => ({
      ...category,
      imageUrl: category.imageUrl && !category.imageUrl.startsWith('http')
        ? `${process.env.API_URL || 'http://localhost:3000'}${category.imageUrl}`
        : category.imageUrl,
    }));
  }

  async findByMenu(menuId: number, restaurantId?: number): Promise<Category[]> {
    const where: any = { menuId };
    if (restaurantId) {
      where.restaurantId = restaurantId;
    }
    const categories = await this.categoriesRepository.find({
      where,
      order: { categoryId: 'DESC' },
    });

    // Add API URL prefix to image URLs
    return categories.map((category) => ({
      ...category,
      imageUrl: category.imageUrl && !category.imageUrl.startsWith('http')
        ? `${process.env.API_URL || 'http://localhost:3000'}${category.imageUrl}`
        : category.imageUrl,
    }));
  }

  async findOne(id: number, restaurantId: number): Promise<Category> {
    const category = await this.categoriesRepository.findOne({
      where: { categoryId: id, restaurantId },
      relations: ['menu'],
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
    restaurantId: number,
  ): Promise<Category> {
    const category = await this.findOne(id, restaurantId);

    Object.assign(category, updateCategoryDto);
    return await this.categoriesRepository.save(category);
  }

  async remove(id: number, restaurantId: number): Promise<void> {
    const category = await this.categoriesRepository.findOne({
      where: { categoryId: id, restaurantId },
      relations: ['subcategories', 'foodItems'],
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    // Check if any food items have been used in orders
    if (category.foodItems && category.foodItems.length > 0) {
      const foodItemIds = category.foodItems.map((item) => item.foodItemId);

      // Check if any of these food items are in orders
      const ordersCount: any = await this.categoriesRepository.query(
        `SELECT COUNT(*) as count FROM kitchen_order_items_tbl WHERE food_item_id IN (?)`,
        [foodItemIds],
      );

      if (ordersCount[0]?.count > 0) {
        throw new BadRequestException(
          'Cannot delete category because its food items have been used in orders. Please archive or hide this category instead.',
        );
      }
    }

    try {
      await this.categoriesRepository.remove(category);
    } catch (error: any) {
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        throw new BadRequestException(
          'Cannot delete category because it is being referenced in orders or other records.',
        );
      }
      throw error;
    }
  }

  // Super admin can access all categories
  async findAllForSuperAdmin(): Promise<Category[]> {
    const categories = await this.categoriesRepository.find({
      relations: ['menu', 'restaurant'],
      order: { categoryId: 'DESC' },
    });

    // Add API URL prefix to image URLs
    return categories.map((category) => ({
      ...category,
      imageUrl: category.imageUrl && !category.imageUrl.startsWith('http')
        ? `${process.env.API_URL || 'http://localhost:3000'}${category.imageUrl}`
        : category.imageUrl,
    }));
  }
}
