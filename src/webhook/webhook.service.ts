import { Injectable } from '@nestjs/common';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';
import { SocketGateway } from 'src/socket/socket.gateway';

@Injectable()
export class WebhookService {
  constructor(
    private socketGateway: SocketGateway
  ) {}
  
  async webhook(payload: any) {
    await this.socketGateway.receiveWhatsApp(payload);
    return payload;
  }
}
