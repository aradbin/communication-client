import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [EmailModule, WhatsappModule, AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
