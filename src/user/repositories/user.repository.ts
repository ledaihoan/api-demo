import {
  EntityManager,
  EntityRepository,
  FilterQuery,
  FindOneOptions,
  FindOptions,
  RequiredEntityData,
} from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { User } from '../entities';

@Injectable()
export class UserRepository {
  private readonly em: EntityManager;

  constructor(
    @InjectRepository(User)
    private readonly repository: EntityRepository<User>,
  ) {
    this.em = this.repository.getEntityManager();
  }

  async create(data: RequiredEntityData<User>) {
    const entity = this.repository.create(data);
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async find(filter?: FilterQuery<User>, options?: FindOptions<User>) {
    return this.repository.find(filter, options);
  }

  async findOne(filter?: FilterQuery<User>, options?: FindOneOptions<User>) {
    return this.repository.findOne(filter, options);
  }
}
