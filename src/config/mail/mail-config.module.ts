import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './mail-config';
import { MailConfigService } from './mail-config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        MAIL_HOST: Joi.string().default('smtp.example.com'),
        MAIL_USERNAME: Joi.string().default('root'),
        MAIL_PASSWORD: Joi.string().default('password'),
        MAIL_PORT: Joi.number().default(465),
        MAIL_SENDER_NAME: Joi.string().default('no-reply'),
      }),
    }),
  ],
  providers: [ConfigService, MailConfigService],
  exports: [ConfigService, MailConfigService],
})
export class MailConfigModule {}
