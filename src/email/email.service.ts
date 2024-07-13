import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { AccountService } from 'src/account/account.service';
import { RequestService } from 'src/request/request.service';

@Injectable()
export class EmailService {
  constructor(
    private accountService: AccountService,
    private requestService: RequestService
  ) {}
  async create(createEmailDto: any) {
    if(!createEmailDto?.account){
      return {}
    }

    const accounts = await this.accountService.findAll();
    const email = accounts?.items?.find((account: any) => (account?.name === createEmailDto?.account));
    if(!email) {
      return {};
    }

    const formData = {
      account_id: email?.id,
      subject: createEmailDto?.subject,
      body: createEmailDto?.text,
      to: [
        {
          "identifier": createEmailDto?.toEmail
        }
      ]
    }

    if(createEmailDto?.reply_to){
      formData['reply_to'] = createEmailDto?.reply_to;
    }

    const response = await this.requestService.create({
      url: '/emails',
      body: formData
    })

    console.log(response)

    return response
  }

  async findAll(query: any) {
    if(!query?.account){
      return {}
    }

    const accounts = await this.accountService.findAll();
    const email = accounts?.items?.find((account: any) => (account?.name === query?.account));
    if(!email) {
      return {};
    }

    const response = await this.requestService.get({
      url: `/emails?account_id=${email?.id}&folder=${query?.folder}&role=${query?.role}${query?.any_email ? `&any_email=${query?.any_email}` : ``}&limit=${query?.pageSize || 10}${query?.cursor ? `&cursor=${query?.cursor}` : ''}`
    })

    return response
  }

  async folders(query: any) {
    if(!query?.account){
      return {}
    }

    const accounts = await this.accountService.findAll();
    const email = accounts?.items?.find((account: any) => (account?.name === query?.account));
    if(!email) {
      return {};
    }

    const response = await this.requestService.get({
      url: `/folders?account_id=${email?.id}`
    })

    return response
  }

  async findOne(id: string) {
    const response = await this.requestService.get({
      url: `/emails/${id}?include_headers=true`
    })

    return response
  }

  update(id: number, updateEmailDto: UpdateEmailDto) {
    return `This action updates a #${id} email`;
  }

  remove(id: number) {
    return `This action removes a #${id} email`;
  }
}
