import { Injectable } from '@nestjs/common';
import { UpdateWhatsappDto } from './dto/update-whatsapp.dto';
import { AccountService } from 'src/account/account.service';
import { RequestService } from 'src/request/request.service';

@Injectable()
export class WhatsappService {
  constructor(
    private accountService: AccountService,
    private requestService: RequestService
  ) {}

  async create(createWhatsappDto: any) {
    const response = await this.requestService.create({
      url: `/chats/${createWhatsappDto?.conversation_id}/messages`,
      body: {
        text: createWhatsappDto?.msg_body,
      }
    });

    return response;
  }

  async findAll() {
    const accounts = await this.accountService.findAll();
    const whatsapp = accounts?.items?.find(account => account?.type === 'WHATSAPP');
    if(!whatsapp) {
      return [];
    }

    const response = await this.requestService.get({
      url: `/chats?account_type=WHATSAPP&account_id=${whatsapp?.id}`
    })

    return response?.items || [];
  }

  async findOne(id: any) {
    const response = await this.requestService.get({
      url: `/chats/${id}/messages`
    })

    return response;
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
