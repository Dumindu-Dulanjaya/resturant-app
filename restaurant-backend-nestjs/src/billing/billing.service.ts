import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice, InvoiceStatus } from './entities/invoice.entity';
import { BillAction, BillActionType } from './entities/bill-action.entity';
import { Order, OrderStatus } from '../orders/entities/order.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { QueryInvoicesDto } from './dto/query-invoices.dto';
import { RecordBillActionDto, BillActionHistoryDto } from './dto/record-bill-action.dto';
import { WebsocketGateway } from '../websocket/websocket.gateway';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Invoice)
    private invoicesRepository: Repository<Invoice>,
    @InjectRepository(BillAction)
    private billActionsRepository: Repository<BillAction>,
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private websocketGateway: WebsocketGateway,
  ) {}

  /** Returns all READY orders for this restaurant (pending billing). */
  async getReadyOrders(restaurantId: number): Promise<Order[]> {
    return this.ordersRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .where('order.restaurantId = :restaurantId', { restaurantId })
      .andWhere('order.status = :status', { status: OrderStatus.READY })
      .orderBy('order.createdAt', 'ASC')
      .getMany();
  }

  /**
   * Creates an invoice for a READY order, marks the order as BILLED,
   * and returns the saved invoice.
   */
  async createInvoice(
    dto: CreateInvoiceDto,
    restaurantId: number,
    adminId?: number,
  ): Promise<Invoice> {
    const { orderId, taxAmount = 0, serviceCharge = 0, discountAmount = 0 } = dto;

    // Load the order
    const order = await this.ordersRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .where('order.orderId = :orderId', { orderId })
      .andWhere('order.restaurantId = :restaurantId', { restaurantId })
      .getOne();

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.status !== OrderStatus.READY) {
      throw new BadRequestException(
        `Order must be in READY status to create an invoice. Current status: ${order.status}`,
      );
    }

    // Check if invoice already exists for this order
    const existing = await this.invoicesRepository.findOne({ where: { orderId } });
    if (existing) {
      // Return existing invoice (idempotent re-print)
      return existing;
    }

    const subtotal = parseFloat(order.totalAmount.toString());
    const tax = parseFloat(taxAmount.toString());
    const charge = parseFloat(serviceCharge.toString());
    const discount = parseFloat(discountAmount.toString());
    const total = subtotal + tax + charge - discount;

    // Build invoice number: INV-YYYYMMDD-<orderId>
    const today = new Date();
    const datePart = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
    const invoiceNumber = `INV-${datePart}-${orderId}`;

    // Snapshot the order items
    const orderItemsSnapshot = order.orderItems.map((item) => ({
      itemName: item.itemName,
      qty: item.qty,
      unitPrice: parseFloat(item.unitPrice.toString()),
      lineTotal: parseFloat(item.lineTotal.toString()),
      notes: item.notes || null,
    }));

    const invoice = this.invoicesRepository.create({
      invoiceNumber,
      orderId,
      restaurantId,
      customerName: order.customerName,
      whatsappNumber: order.whatsappNumber,
      tableNo: order.tableNo,
      orderItemsJson: orderItemsSnapshot,
      subtotal,
      taxAmount: tax,
      serviceCharge: charge,
      discountAmount: discount,
      totalAmount: total,
      invoiceStatus: InvoiceStatus.PENDING,
      isPrinted: true,
      isSentWhatsapp: false,
      createdByAdminId: adminId ?? null,
    });

    const savedInvoice = await this.invoicesRepository.save(invoice) as Invoice;

    // Transition order to BILLED
    order.status = OrderStatus.BILLED;
    await this.ordersRepository.save(order);

    // Notify connected clients in real-time
    this.websocketGateway.emitOrderStatusUpdate({
      orderId: order.orderId,
      orderNo: order.orderNo,
      tableNo: order.tableNo,
      status: order.status,
      restaurantId: order.restaurantId,
    });
    this.websocketGateway.server.emit('dashboard:refresh');

    return savedInvoice;
  }

  /** Marks a BILLED order as SERVED. */
  async markOrderServed(orderId: number, restaurantId: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { orderId, restaurantId },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.status !== OrderStatus.BILLED) {
      throw new BadRequestException(
        `Order must be in BILLED status to mark as served. Current status: ${order.status}`,
      );
    }

    order.status = OrderStatus.SERVED;
    const saved = await this.ordersRepository.save(order);

    this.websocketGateway.emitOrderStatusUpdate({
      orderId: saved.orderId,
      orderNo: saved.orderNo,
      tableNo: saved.tableNo,
      status: saved.status,
      restaurantId: saved.restaurantId,
    });
    this.websocketGateway.server.emit('dashboard:refresh');

    return saved;
  }

  /** Returns a paginated list of invoices for this restaurant. */
  async findAllInvoices(
    restaurantId: number,
    queryDto: QueryInvoicesDto = {},
  ): Promise<Invoice[]> {
    const { status, from, to, tableNo, invoiceNumber } = queryDto;

    const query = this.invoicesRepository
      .createQueryBuilder('invoice')
      .where('invoice.restaurantId = :restaurantId', { restaurantId })
      .orderBy('invoice.createdAt', 'DESC');

    if (status) {
      query.andWhere('invoice.invoiceStatus = :status', { status });
    }

    if (from || to) {
      const startDate = from ? new Date(`${from}T00:00:00.000Z`) : new Date('1970-01-01');
      const endDate = to ? new Date(`${to}T23:59:59.999Z`) : new Date('2099-12-31');
      query.andWhere('invoice.createdAt BETWEEN :startDate AND :endDate', { startDate, endDate });
    }

    if (tableNo) {
      query.andWhere('invoice.tableNo LIKE :tableNo', { tableNo: `%${tableNo}%` });
    }

    if (invoiceNumber) {
      query.andWhere('invoice.invoiceNumber LIKE :invoiceNumber', {
        invoiceNumber: `%${invoiceNumber}%`,
      });
    }

    return query.getMany();
  }

  /** Returns a single invoice (scoped to restaurantId for security). */
  async findOneInvoice(invoiceId: number, restaurantId: number): Promise<Invoice> {
    const invoice = await this.invoicesRepository.findOne({
      where: { invoiceId, restaurantId },
    });

    if (!invoice) {
      throw new NotFoundException(`Invoice #${invoiceId} not found`);
    }

    return invoice;
  }

  /** Marks an invoice's isSentWhatsapp flag as true. */
  async markWhatsappSent(invoiceId: number, restaurantId: number): Promise<Invoice> {
    const invoice = await this.findOneInvoice(invoiceId, restaurantId);
    invoice.isSentWhatsapp = true;
    return this.invoicesRepository.save(invoice);
  }

  /** Marks an invoice as PAID. */
  async markInvoicePaid(invoiceId: number, restaurantId: number): Promise<Invoice> {
    const invoice = await this.findOneInvoice(invoiceId, restaurantId);
    invoice.invoiceStatus = InvoiceStatus.PAID;
    return this.invoicesRepository.save(invoice);
  }

  /** Records a bill action (PDF download, print, or WhatsApp send). */
  async recordBillAction(
    dto: RecordBillActionDto,
    restaurantId: number,
    userId?: number,
    ipAddress?: string,
  ): Promise<BillAction> {
    // Verify invoice exists and belongs to this restaurant
    const invoice = await this.invoicesRepository.findOne({
      where: { invoiceId: dto.invoiceId, restaurantId },
    });

    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }

    // Create bill action record
    const billAction = this.billActionsRepository.create({
      invoiceId: dto.invoiceId,
      orderId: dto.orderId,
      restaurantId,
      actionType: dto.actionType,
      userId: userId ?? null,
      deviceInfo: dto.deviceInfo ?? null,
      ipAddress: ipAddress ?? null,
      notes: dto.notes ?? null,
    });

    const saved = await this.billActionsRepository.save(billAction);

    // Update invoice flags based on action type
    if (dto.actionType === BillActionType.BILL_PRINTED) {
      invoice.isPrinted = true;
    } else if (dto.actionType === BillActionType.WHATSAPP_SENT) {
      invoice.isSentWhatsapp = true;
    }
    // PDF_DOWNLOADED doesn't directly update invoice flags but is tracked

    await this.invoicesRepository.save(invoice);

    return saved;
  }

  /** Retrieves bill action history for an order. */
  async getBillActionHistory(
    orderId: number,
    restaurantId: number,
  ): Promise<BillActionHistoryDto[]> {
    const billActions = await this.billActionsRepository
      .createQueryBuilder('ba')
      .where('ba.orderId = :orderId', { orderId })
      .andWhere('ba.restaurantId = :restaurantId', { restaurantId })
      .orderBy('ba.createdAt', 'ASC')
      .getMany();

    return billActions.map((action) => ({
      billActionId: action.billActionId,
      invoiceId: action.invoiceId,
      orderId: action.orderId,
      actionType: action.actionType,
      userId: action.userId,
      deviceInfo: action.deviceInfo,
      createdAt: action.createdAt,
      notes: action.notes,
    }));
  }

  /**
   * Retrieves a summary of all bill actions for an invoice.
   * Useful for checking if PDF was downloaded, bill was printed, WhatsApp was sent.
   */
  async getBillActionSummary(invoiceId: number, restaurantId: number) {
    const billActions = await this.billActionsRepository
      .createQueryBuilder('ba')
      .where('ba.invoiceId = :invoiceId', { invoiceId })
      .andWhere('ba.restaurantId = :restaurantId', { restaurantId })
      .orderBy('ba.createdAt', 'ASC')
      .getMany();

    return {
      invoiceId,
      pdfDownloads: billActions.filter((a) => a.actionType === BillActionType.PDF_DOWNLOADED),
      prints: billActions.filter((a) => a.actionType === BillActionType.BILL_PRINTED),
      whatsappSends: billActions.filter((a) => a.actionType === BillActionType.WHATSAPP_SENT),
      totalActions: billActions.length,
      allActions: billActions,
    };
  }
}
