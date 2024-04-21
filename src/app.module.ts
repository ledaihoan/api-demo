import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JoiPipeModule } from 'nestjs-joi';

import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        '.env.base',
        `.env.${process.env.NODE_ENV || 'development'}`,
      ],
      isGlobal: true,
    }),
    JoiPipeModule.forRoot(),
    UserModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
