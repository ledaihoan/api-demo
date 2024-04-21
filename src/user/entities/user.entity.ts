import {
  Entity,
  IntegerType,
  PrimaryKey,
  Property,
  StringType,
} from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

import { BaseEntity } from '../../common/database/entities';

@Entity({ tableName: 'api_demo.user' })
export class User extends BaseEntity {
  @PrimaryKey({ type: StringType })
  id = uuidv4();

  @Property({ type: StringType, fieldName: 'first_name' })
  firstName: string;

  @Property({ type: StringType, fieldName: 'last_name' })
  lastName: string;

  @Property({ type: StringType, fieldName: 'email' })
  email: string;

  @Property({ type: StringType, fieldName: 'password' })
  password: string;

  @Property({ type: IntegerType, default: 0 })
  coin: number;
}
