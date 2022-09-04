import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { MailConfigModule } from 'src/config/mail/mail-config.module';
import { MailConfigService } from 'src/config/mail/mail-config.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [MailConfigModule],
      useFactory: async (mailConfigService: MailConfigService) => ({
        transport: {
          host: mailConfigService.host,
          secure: false,
          auth: {
            user: mailConfigService.username,
            pass: mailConfigService.password,
          },
        },
        defaults: {
          from: `"${mailConfigService.senderName}" <${mailConfigService.username}>`,
        },
        template: {
          dir: join(__dirname, '..', 'mail/templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [MailConfigService],
    }),
  ],
})
export class MailProviderModule {}
