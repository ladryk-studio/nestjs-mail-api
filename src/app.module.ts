import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AppConfigModule } from './config/app/app-config.module';
import { MailConfigModule } from './config/mail/mail-config.module';
import { MailProviderModule } from './providers/mail-provider.module';
import { SendMailModule } from './mail/send/send-mail.module';

@Module({
  imports: [
    AppConfigModule,
    MailConfigModule,
    MailProviderModule,
    SendMailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
