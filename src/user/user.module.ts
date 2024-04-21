import { Module } from '@nestjs/common';

import { CoreDatabaseModule } from '../common/database';
import { User } from './entities';
import { UserRepository } from './repositories';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({})
export class UserModule {
  static forRoot() {
    return {
      module: UserModule,
      imports: [
        CoreDatabaseModule.forRoot({
          connectionString: process.env.DB_CONNECTION_STRING,
          entities: [User],
        }),
      ],
      providers: [UserRepository, UserService],
      controllers: [UserController],
      exports: [UserRepository, UserService],
    };
  }
}
