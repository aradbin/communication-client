import { Injectable } from '@nestjs/common';
import { CreateWhatsappDto } from './dto/create-whatsapp.dto';
import { UpdateWhatsappDto } from './dto/update-whatsapp.dto';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class WhatsappService {
  constructor(
    private accountService: AccountService,
) {}

  async create(createWhatsappDto: CreateWhatsappDto) {
    
  }

  async findAll() {
    const accounts = await this.accountService.findAll();
    const whatsapp = accounts?.items?.find(account => account?.type === 'WHATSAPP');
    if(!whatsapp) {
      return [];
    }

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-API-KEY': process.env.UNIPILE_API_KEY
      }
    };
    
    const chats = await fetch(`${process.env.UNIPILE_BASE_URL}/chats?account_type=WHATSAPP&account_id=${whatsapp?.id}`, options)
      .then(response => response.json())
      .then(response => response?.items || [])
      .catch(err => console.error(err));

    return chats;
  }

  async findOne(id: any) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-API-KEY': process.env.UNIPILE_API_KEY
      }
    };
    
    const messages = await fetch(`${process.env.UNIPILE_BASE_URL}/chats/${id}/messages`, options)
      .then(response => response.json())
      .then(response => response)
      .catch(err => console.error(err));

    return messages;
  }

  update(id: number, updateWhatsappDto: UpdateWhatsappDto) {
    return `This action updates a #${id} whatsapp`;
  }

  remove(id: number) {
    return `This action removes a #${id} whatsapp`;
  }

  async getAttachment(id: string, attachmentId: string) {
    const options = {
      method: 'GET',
      headers: {
        // accept: 'application/json',
        'X-API-KEY': process.env.UNIPILE_API_KEY
      }
    };
    
    return await fetch(`${process.env.UNIPILE_BASE_URL}/messages/${id}/attachments/${attachmentId}`, options)
  }
}
