import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  Request,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { BillingService } from './billing.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { QueryInvoicesDto } from './dto/query-invoices.dto';
import { RecordBillActionDto } from './dto/record-bill-action.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/enums/role.enum';

@SkipThrottle()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  /**
   * GET /billing/ready-orders
   * Returns all READY orders waiting to be billed.
   */
  @Get('ready-orders')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.KITCHEN, UserRole.CASHIER)
  getReadyOrders(@Request() req) {
    return this.billingService.getReadyOrders(req.user.restaurantId);
  }

  /**
   * POST /billing/invoices
   * Creates an invoice for a READY order and transitions it to BILLED.
   */
  @Post('invoices')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.KITCHEN, UserRole.CASHIER)
  createInvoice(@Body() dto: CreateInvoiceDto, @Request() req) {
    return this.billingService.createInvoice(
      dto,
      req.user.restaurantId,
      req.user.adminId ?? req.user.id,
    );
  }

  /**
   * GET /billing/invoices
   * Returns invoice history with optional filters.
   */
  @Get('invoices')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.KITCHEN, UserRole.CASHIER)
  findAllInvoices(@Query() queryDto: QueryInvoicesDto, @Request() req) {
    return this.billingService.findAllInvoices(req.user.restaurantId, queryDto);
  }

  /**
   * GET /billing/invoices/:id
   * Returns a single invoice by ID.
   */
  @Get('invoices/:id')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.KITCHEN, UserRole.CASHIER)
  findOneInvoice(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ) {
    return this.billingService.findOneInvoice(id, req.user.restaurantId);
  }

  /**
   * PATCH /billing/orders/:id/mark-served
   * Transitions a BILLED order to SERVED.
   */
  @Patch('orders/:id/mark-served')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.KITCHEN, UserRole.CASHIER)
  markServed(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ) {
    return this.billingService.markOrderServed(id, req.user.restaurantId);
  }

  /**
   * PATCH /billing/invoices/:id/mark-whatsapp-sent
   * Records that the WhatsApp bill was sent for this invoice.
   */
  @Patch('invoices/:id/mark-whatsapp-sent')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.KITCHEN, UserRole.CASHIER)
  markWhatsappSent(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ) {
    return this.billingService.markWhatsappSent(id, req.user.restaurantId);
  }

  /**
   * PATCH /billing/invoices/:id/mark-paid
   * Marks an invoice as PAID.
   */
  @Patch('invoices/:id/mark-paid')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.KITCHEN, UserRole.CASHIER)
  markInvoicePaid(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ) {
    return this.billingService.markInvoicePaid(id, req.user.restaurantId);
  }

  /**
   * POST /billing/bill-actions
   * Records a bill action (PDF download, print, or WhatsApp send).
   */
  @Post('bill-actions')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.KITCHEN, UserRole.CASHIER)
  recordBillAction(
    @Body() dto: RecordBillActionDto,
    @Request() req,
  ) {
    const ipAddress = req.ip || req.connection?.remoteAddress || 'unknown';
    const deviceInfo = req.headers['user-agent'] || 'unknown';
    return this.billingService.recordBillAction(
      dto,
      req.user.restaurantId,
      req.user.id,
      ipAddress,
    );
  }

  /**
   * GET /billing/bill-actions/order/:orderId
   * Retrieves bill action history for a specific order.
   */
  @Get('bill-actions/order/:orderId')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.KITCHEN, UserRole.CASHIER)
  getBillActionHistory(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Request() req,
  ) {
    return this.billingService.getBillActionHistory(orderId, req.user.restaurantId);
  }

  /**
   * GET /billing/bill-actions/invoice/:invoiceId/summary
   * Retrieves a summary of all bill actions for an invoice.
   */
  @Get('bill-actions/invoice/:invoiceId/summary')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.KITCHEN, UserRole.CASHIER)
  getBillActionSummary(
    @Param('invoiceId', ParseIntPipe) invoiceId: number,
    @Request() req,
  ) {
    return this.billingService.getBillActionSummary(invoiceId, req.user.restaurantId);
  }
}
