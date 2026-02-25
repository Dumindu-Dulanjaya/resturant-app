import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Menu } from '../../menus/entities/menu.entity';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';

@Entity('category_tbl')
export class Category {
  @PrimaryGeneratedColumn({ name: 'category_id' })
  categoryId: number;

  @Column({ name: 'category_name', length: 20 })
  categoryName: string;

  @Column({ name: 'menu_id' })
  menuId: number;

  @Column({ name: 'image_url', length: 255 })
  imageUrl: string;

  @Column({ length: 100 })
  description: string;

  @Column({ name: 'restaurant_id' })
  restaurantId: number;

  @ManyToOne(() => Menu)
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;

  @ManyToOne(() => Restaurant)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;
}
