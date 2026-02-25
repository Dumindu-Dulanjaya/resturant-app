import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private menusRepository: Repository<Menu>,
  ) {}

  async create(createMenuDto: CreateMenuDto, restaurantId: number): Promise<Menu> {
    const menu = this.menusRepository.create({
      ...createMenuDto,
      restaurantId,
    });

    return await this.menusRepository.save(menu);
  }

  async findAll(restaurantId: number): Promise<Menu[]> {
    return await this.menusRepository.find({
      where: { restaurantId },
      order: { menuId: 'DESC' },
    });
  }

  async findOne(id: number, restaurantId: number): Promise<Menu> {
    const menu = await this.menusRepository.findOne({
      where: { menuId: id, restaurantId },
    });

    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }

    return menu;
  }

  async update(id: number, updateMenuDto: UpdateMenuDto, restaurantId: number): Promise<Menu> {
    const menu = await this.findOne(id, restaurantId);

    Object.assign(menu, updateMenuDto);
    return await this.menusRepository.save(menu);
  }

  async remove(id: number, restaurantId: number): Promise<void> {
    const menu = await this.findOne(id, restaurantId);
    await this.menusRepository.remove(menu);
  }

  // Super admin can access all menus
  async findAllForSuperAdmin(): Promise<Menu[]> {
    return await this.menusRepository.find({
      relations: ['restaurant'],
      order: { menuId: 'DESC' },
    });
  }
}
