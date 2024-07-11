import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WhatsappService } from 'src/whatsapp/whatsapp.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private whatsappService: WhatsappService
  ) { }

  @WebSocketServer() server: Server;
  private connectedUsers: { [userId: number]: Socket } = {};

  handleConnection(client: Socket) {
    const userId = Number(client.handshake.query.userId);
    this.connectedUsers[userId] = client;
  }

  handleDisconnect(client: Socket) {
    const userId = Number(client.handshake.query.userId);
    delete this.connectedUsers[userId];
  }

  @SubscribeMessage('whatsapp')
  async handleWhatsApp(@MessageBody() data: any) {
    const response = await this.whatsappService.create(data);

    return response;
  }
}
