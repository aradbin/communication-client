import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { UpdateWhatsappDto } from './dto/update-whatsapp.dto';
import { Response } from 'express';

@Controller('whatsapp')
export class WhatsappController {
  constructor(
    private readonly whatsappService: WhatsappService
  ) {}

  @Post()
  async create(@Body() createWhatsappDto: any) {
    return await this.whatsappService.create(createWhatsappDto);
  }

  @Get()
  async findAll() {
    return await this.whatsappService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.whatsappService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWhatsappDto: UpdateWhatsappDto) {
    return this.whatsappService.update(+id, updateWhatsappDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.whatsappService.remove(+id);
  }

  @Get(':id/attachment/:attachmentId')
  async getAttachment(@Param('id') id: string, @Param('attachmentId') attachmentId: string, @Res() res: Response) {
    const response = await this.whatsappService.getAttachment(id, attachmentId);
    if(response.headers.get('Content-Type').startsWith('image')) {
      const data = await response.blob();
      res.send(data);
    }else{
      const data = await response.json(); 
      res.send(data);
    }
  }
}
