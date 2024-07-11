import { Global, Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { WhatsappModule } from 'src/whatsapp/whatsapp.module';

@Global()
@Module({
    imports: [WhatsappModule],
    providers: [SocketGateway],
    exports: [SocketGateway]
})
export class SocketModule { }
