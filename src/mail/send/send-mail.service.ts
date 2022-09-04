import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendMailDto } from './dtos/send-mail.dto';

@Injectable()
export class SendMailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(body: SendMailDto, files: any) {
    const { to, title, template, context } = body;
    const parsedContext = JSON.parse(context);

    try {
      await this.mailerService.sendMail({
        to: to,
        subject: title,
        template: template,
        context: parsedContext,
        attachments: files
          ? files.map((file: any) => ({
              filename: file.originalname,
              content: file.buffer,
              encoding: 'base64',
              contentType: file.mimetype,
            }))
          : [],
      });

      return {
        status: 1,
        message: 'Message sent successfully',
      };
    } catch (err: any) {
      console.log(err);

      return {
        status: 0,
        message: 'Something went wrong',
      };
    }
  }
}
