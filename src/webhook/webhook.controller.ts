import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('whatsapp')
  async whatsapp(@Body() payload: any) {
    console.log('payload',payload)
    return await this.webhookService.webhook(payload);
  }
}
