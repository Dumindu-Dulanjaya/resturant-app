import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Admin } from '../../auth/entities/admin.entity';

@Entity('restaurant_tbl')
export class Restaurant {
  @PrimaryGeneratedColumn({ name: 'restaurant_id' })
  restaurantId: number;

  @Column({ name: 'restaurant_name', type: 'varchar', length: 255 })
  restaurantName: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ name: 'contact_number', type: 'varchar', length: 20 })
  contactNumber: string;

  @Column({
    name: 'subscription_status',
    type: 'enum',
    enum: ['active', 'inactive'],
    default: 'inactive',
  })
  subscriptionStatus: string;

  @Column({ name: 'subscription_expiry_date', type: 'timestamp', nullable: true })
  subscriptionExpiryDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'varchar', length: 65 })
  email: string;

  @Column({ name: 'opening_time', type: 'time' })
  openingTime: string;

  @Column({ name: 'closing_time', type: 'time' })
  closingTime: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  logo: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ name: 'currency_id', nullable: true })
  currencyId: number;

  @Column({ name: 'country_id', nullable: true })
  countryId: number;

  @Column({ name: 'package_id', nullable: true })
  packageId: number;

  @OneToMany(() => Admin, (admin) => admin.restaurant)
  admins: Admin[];
}
