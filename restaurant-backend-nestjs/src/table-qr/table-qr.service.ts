import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableQr } from './entities/table-qr.entity';
import * as crypto from 'crypto';

@Injectable()
export class TableQrService {
  constructor(
    @InjectRepository(TableQr)
    private readonly tableQrRepository: Repository<TableQr>,
  ) {}

  async findByTableKey(tableKey: string): Promise<TableQr | null> {
    return this.tableQrRepository.findOne({
      where: { tableKey, isActive: 1 },
      relations: ['restaurant'],
    });
  }

  async resolveTableInfo(tableKey: string): Promise<{
    restaurantId: number;
    restaurantName: string;
    tableNo: string;
  }> {
    const tableQr = await this.findByTableKey(tableKey);

    if (!tableQr) {
      throw new NotFoundException('Invalid or inactive QR code');
    }

    return {
      restaurantId: tableQr.restaurantId,
      restaurantName: tableQr.restaurant?.restaurantName || 'Restaurant',
      tableNo: tableQr.tableNo,
    };
  }

  // Admin: Get all QR codes for a restaurant
  async findAllByRestaurant(restaurantId: number): Promise<TableQr[]> {
    return this.tableQrRepository.find({
      where: { restaurantId, isActive: 1 },
      order: { tableNo: 'ASC' },
    });
  }

  // Admin: Generate new QR code for a table
  async generateQrCode(
    restaurantId: number,
    tableNo: string,
    frontendUrl: string = 'http://localhost:3001',
  ): Promise<TableQr> {
    // Check if table already exists for this restaurant
    const existing = await this.tableQrRepository.findOne({
      where: { restaurantId, tableNo },
    });

    if (existing) {
      throw new ConflictException(`QR code already exists for ${tableNo}`);
    }

    // Generate unique table key
    const tableKey = crypto.randomBytes(32).toString('hex'); // 64 characters

    // Create QR URL
    const qrUrl = `${frontendUrl}/qr/${tableKey}`;

    const tableQr = this.tableQrRepository.create({
      restaurantId,
      tableNo,
      tableKey,
      qrUrl,
      isActive: 1,
    });

    return this.tableQrRepository.save(tableQr);
  }

  // Admin: Delete one QR code
  async deleteOne(tableQrId: number, restaurantId: number): Promise<void> {
    const result = await this.tableQrRepository.delete({
      tableQrId,
      restaurantId, // Ensure user can only delete their own restaurant's QR codes
    });

    if (result.affected === 0) {
      throw new NotFoundException('QR code not found');
    }
  }

  // Admin: Delete all QR codes for a restaurant
  async deleteAllByRestaurant(restaurantId: number): Promise<number> {
    const result = await this.tableQrRepository.delete({ restaurantId });
    return result.affected || 0;
  }

  // Legacy methods for backward compatibility
  async create(
    restaurantId: number,
    tableNo: string,
    tableKey: string,
  ): Promise<TableQr> {
    const tableQr = this.tableQrRepository.create({
      restaurantId,
      tableNo,
      tableKey,
      qrUrl: `http://localhost:3001/qr/${tableKey}`,
      isActive: 1,
    });

    return this.tableQrRepository.save(tableQr);
  }

  async findByRestaurant(restaurantId: number): Promise<TableQr[]> {
    return this.tableQrRepository.find({
      where: { restaurantId },
      order: { tableNo: 'ASC' },
    });
  }

  async deactivate(tableQrId: number): Promise<void> {
    await this.tableQrRepository.update(tableQrId, { isActive: 0 });
  }

  async activate(tableQrId: number): Promise<void> {
    await this.tableQrRepository.update(tableQrId, { isActive: 1 });
  }
}
