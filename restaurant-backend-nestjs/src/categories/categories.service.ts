import { Injectable, NotFoundException } from '@nestjs/common';
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
  ) {}

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
    return await this.categoriesRepository.find({
      where,
      relations: ['menu'],
      order: { categoryId: 'DESC' },
    });
  }

  async findByMenu(menuId: number, restaurantId: number): Promise<Category[]> {
    return await this.categoriesRepository.find({
      where: { menuId, restaurantId },
      order: { categoryId: 'DESC' },
    });
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
    const category = await this.findOne(id, restaurantId);
    await this.categoriesRepository.remove(category);
  }

  // Super admin can access all categories
  async findAllForSuperAdmin(): Promise<Category[]> {
    return await this.categoriesRepository.find({
      relations: ['menu', 'restaurant'],
      order: { categoryId: 'DESC' },
    });
  }
}
