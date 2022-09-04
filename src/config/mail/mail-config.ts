import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
  host: process.env.MAIL_HOST,
  username: process.env.MAIL_USERNAME,
  password: process.env.MAIL_PASSWORD,
  port: process.env.MAIL_PORT,
  senderName: process.env.MAIL_SENDER_NAME,
}));
