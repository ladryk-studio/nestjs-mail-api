import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SendMailDto } from './dtos/send-mail.dto';
import { SendMailService } from './send-mail.service';

@Controller('mail')
export class SendMailController {
  constructor(private readonly sendMailService: SendMailService) {}

  @Post('send')
  @UseInterceptors(FilesInterceptor('files', 20, {}))
  async uploadFile(@UploadedFiles() files, @Body() body: SendMailDto) {
    return await this.sendMailService.sendMail(body, files);
  }
}
