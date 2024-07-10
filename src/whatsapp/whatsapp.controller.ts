import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { CreateWhatsappDto } from './dto/create-whatsapp.dto';
import { UpdateWhatsappDto } from './dto/update-whatsapp.dto';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Post()
  async create(@Body() createWhatsappDto: any) {
    // console.log('start')
    // await fetch('https://api2.unipile.com:13214/api/v1/chats', {
    //   method: 'GET',
    //   headers: {
    //     accept: 'application/json',
    //     'X-API-KEY': 'wFwfk/cP.ccLHavfhlifHp25s9DEHK/51sQRJl2mUu15Wxy/j0Nc='
    //   }
    // }).then(response => response.json())
    //   .then(response => console.log(response))
    //   .catch(err => console.error(err));

    // console.log('end')

    // return this.whatsappService.create(createWhatsappDto);
  }

  @Get()
  findAll() {
    return this.whatsappService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.whatsappService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWhatsappDto: UpdateWhatsappDto) {
    return this.whatsappService.update(+id, updateWhatsappDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.whatsappService.remove(+id);
  }
}
