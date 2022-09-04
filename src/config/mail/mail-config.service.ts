import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('mail.host');
  }

  get username(): string {
    return this.configService.get<string>('mail.username');
  }

  get password(): string {
    return this.configService.get<string>('mail.password');
  }

  get port(): number {
    return Number(this.configService.get<number>('mail.port'));
  }
}
