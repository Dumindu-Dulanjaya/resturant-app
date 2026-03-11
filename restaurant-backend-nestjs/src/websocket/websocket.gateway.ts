import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || '*',
    credentials: true,
  },
  namespace: 'events',
})
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger = new Logger('WebsocketGateway');
  private connectedClients = new Map<string, { socketId: string; userId?: number; role?: string }>();

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    this.connectedClients.set(client.id, { socketId: client.id });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.connectedClients.delete(client.id);
  }

  @SubscribeMessage('authenticate')
  handleAuthenticate(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { userId: number; role: string },
  ) {
    this.connectedClients.set(client.id, {
      socketId: client.id,
      userId: data.userId,
      role: data.role,
    });
    this.logger.log(`Client authenticated: ${client.id} - User: ${data.userId} - Role: ${data.role}`);
    return { success: true };
  }

  // Emit dashboard stats update to all clients
  emitDashboardUpdate(stats: any) {
    this.server.emit('dashboard:update', stats);
    this.logger.log('Dashboard stats broadcasted');
  }

  // Emit new order notification
  emitNewOrder(order: any) {
    this.server.emit('order:new', order);
    this.logger.log(`New order notification sent: ${order.id}`);
  }

  // Emit order status update
  emitOrderStatusUpdate(order: any) {
    this.server.emit('order:status-update', order);
    this.logger.log(`Order status update sent: ${order.id}`);
  }

  // Emit notification to specific user role
  emitToRole(role: string, event: string, data: any) {
    const roleClients = Array.from(this.connectedClients.values())
      .filter((client) => client.role === role);
    
    roleClients.forEach((client) => {
      this.server.to(client.socketId).emit(event, data);
    });
    
    this.logger.log(`Event ${event} sent to ${roleClients.length} clients with role: ${role}`);
  }
}
