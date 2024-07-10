import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountService {
  async create(createAccountDto: CreateAccountDto) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'X-API-KEY': process.env.UNIPILE_API_KEY
      },
      body: JSON.stringify({
        type: 'create',
        providers: ['WHATSAPP'],
        expiresOn: this.getTomorrowDate(),
        name: 'Test',
        api_url: process.env.UNIPILE_BASE_URL
      })
    };
    
    const url = await fetch(`${process.env.UNIPILE_BASE_URL}/hosted/accounts/link`, options)
      .then(response => response.json())
      .then(response => response?.url)
      .catch(err => console.error(err));

    return url;
  }

  async findAll() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-API-KEY': process.env.UNIPILE_API_KEY
      }
    };
    
    const accounts = await fetch(`${process.env.UNIPILE_BASE_URL}/accounts`, options)
      .then(response => response.json())
      .then(response => response)
      .catch(err => console.error(err));

    return accounts;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }

  getTomorrowDate() {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    const year = tomorrow.getFullYear();
    let month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    let day = String(tomorrow.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}T00:00:00.000Z`;
  }
}
