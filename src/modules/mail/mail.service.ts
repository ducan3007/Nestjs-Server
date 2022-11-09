import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
   private readonly transporter: Mail;

   constructor(private readonly configService: ConfigService) {
      const host = this.configService.get('HOST');
      const username = this.configService.get('USER');
      const password = this.configService.get('PASS');

      this.transporter = createTransport({
         host: host,
         secure: true,
         port: 465,
         auth: {
            user: username,
            pass: password,
         },
      });
   }

   async sendMail(options: Mail.Options) {
      return this.transporter.sendMail(options);
   }
}
