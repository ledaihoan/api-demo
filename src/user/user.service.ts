import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

import { parseFieldsQuery } from '../common/utils';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities';
import { UserRepository } from './repositories';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    return this.repository.create(dto);
  }

  async getUserById(id: string, fields?: string): Promise<Partial<User>> {
    const fieldArr = parseFieldsQuery(fields);
    console.log(fieldArr);
    const entity = await this.repository.findOne({ id });
    if (entity && !_.isEmpty(fieldArr)) {
      return _.pick(entity, fieldArr);
    }
    return entity;
  }
}
