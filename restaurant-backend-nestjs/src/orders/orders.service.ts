import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { FoodItem } from '../food-items/entities/food-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
    @InjectRepository(FoodItem)
    private foodItemsRepository: Repository<FoodItem>,
  ) {}

  async create(createOrderDto: CreateOrderDto, restaurantId: number) {
    const { tableNo, notes, items } = createOrderDto;

    if (!items || items.length === 0) {
      throw new BadRequestException('Order must contain at least one item');
    }

    // Fetch all food items in one query
    const foodItemIds = items.map((item) => item.foodItemId);
    const foodItems = await this.foodItemsRepository.findByIds(foodItemIds);

    if (foodItems.length !== foodItemIds.length) {
      throw new NotFoundException('One or more food items not found');
    }

    // Create a map for quick lookup
    const foodItemMap = new Map(
      foodItems.map((item) => [item.foodItemId, item]),
    );

    // Calculate totals and prepare order items
    let totalAmount = 0;
    const orderItems: Partial<OrderItem>[] = [];

    for (const item of items) {
      const foodItem = foodItemMap.get(item.foodItemId);
      if (!foodItem) {
        throw new NotFoundException(
          `Food item with ID ${item.foodItemId} not found`,
        );
      }

      const unitPrice = parseFloat(foodItem.price.toString());
      const lineTotal = unitPrice * item.qty;
      totalAmount += lineTotal;

      orderItems.push({
        foodItemId: item.foodItemId,
        itemName: foodItem.itemName,
        unitPrice: unitPrice,
        qty: item.qty,
        lineTotal: lineTotal,
        notes: item.notes,
      });
    }

    // Generate order number (simple timestamp-based for MVP)
    const orderNo = `ORD-${Date.now()}`;

    // Create order with cascade
    const order = this.ordersRepository.create({
      orderNo,
      tableNo,
      notes,
      totalAmount,
      restaurantId,
      status: OrderStatus.NEW,
      orderItems: orderItems as OrderItem[],
    });

    return await this.ordersRepository.save(order);
  }

  async findAll(restaurantId?: number, status?: string) {
    const query = this.ordersRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .leftJoinAndSelect('orderItems.foodItem', 'foodItem')
      .orderBy('order.createdAt', 'ASC');

    if (restaurantId) {
      query.where('order.restaurantId = :restaurantId', { restaurantId });
    }

    if (status) {
      query.andWhere('order.status = :status', { status });
    }

    return await query.getMany();
  }

  async findOne(id: number, restaurantId?: number) {
    const query = this.ordersRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .leftJoinAndSelect('orderItems.foodItem', 'foodItem')
      .where('order.orderId = :id', { id });

    if (restaurantId) {
      query.andWhere('order.restaurantId = :restaurantId', { restaurantId });
    }

    const order = await query.getOne();

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async updateStatus(
    id: number,
    updateOrderStatusDto: UpdateOrderStatusDto,
    restaurantId?: number,
  ) {
    const order = await this.findOne(id, restaurantId);

    order.status = updateOrderStatusDto.status;
    return await this.ordersRepository.save(order);
  }

  async remove(id: number, restaurantId?: number) {
    const order = await this.findOne(id, restaurantId);
    await this.ordersRepository.remove(order);
    return { message: 'Order deleted successfully' };
  }
}
