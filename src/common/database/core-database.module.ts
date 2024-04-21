import { MikroOrmModule, MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { DynamicModule, Module, NotFoundException } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { DatabaseModuleOptions } from './database.types';
import { BaseEntity, WithSoftDeleteEntity } from './entities';
import { DatabaseExceptionFilter } from './filters';

const BASE_ENTITIES = [BaseEntity, WithSoftDeleteEntity];

const DEFAULT_OPTIONS: MikroOrmModuleOptions = {
  discovery: {
    disableDynamicFileAccess: true,
  },
  driver: PostgreSqlDriver,
  autoLoadEntities: true,
  entities: BASE_ENTITIES,
  findOneOrFailHandler: (entityName) =>
    new NotFoundException(`${entityName} not found`),
};

@Module({
  controllers: [],
  providers: [],
  exports: [],
})
export class CoreDatabaseModule {
  static forRoot(options: DatabaseModuleOptions): DynamicModule {
    if (!options.connectionString) {
      throw new Error('Missing database connection string');
    }

    return {
      module: CoreDatabaseModule,
      imports: [
        MikroOrmModule.forRoot({
          ...DEFAULT_OPTIONS,
          clientUrl: options.connectionString,
        }),
        MikroOrmModule.forFeature({ entities: options.entities }),
      ],
      providers: [
        {
          provide: APP_FILTER,
          useClass: DatabaseExceptionFilter,
        },
      ],
      exports: [MikroOrmModule],
    };
  }

  static forTest(options: DatabaseModuleOptions): DynamicModule {
    return {
      module: CoreDatabaseModule,
      imports: [
        MikroOrmModule.forRoot({
          ...DEFAULT_OPTIONS,
          tsNode: true,
          clientUrl: 'postgres://fake:fake@fake:5432/fake',
        }),
        MikroOrmModule.forFeature({ entities: options.entities }),
      ],
    };
  }
}
