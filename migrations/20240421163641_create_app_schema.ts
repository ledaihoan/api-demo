import { Knex } from 'knex';

import {
  addUserIfNotExist,
  dropUserIfExists,
  grantAllSchemaPermissionToRole,
  revokeAllSchemaPermissionFromRole,
} from '../knex-role-utils';

const USER = process.env.DB_USER;
const SCHEMA_NAME = 'api_demo';
const PASSWORD = process.env.DB_PASSWORD;

export async function up(knex: Knex): Promise<void> {
  await addUserIfNotExist(knex, USER, PASSWORD);

  await knex.schema.createSchemaIfNotExists(SCHEMA_NAME);

  await grantAllSchemaPermissionToRole(knex, SCHEMA_NAME, USER);
}

export async function down(knex: Knex): Promise<void> {
  await revokeAllSchemaPermissionFromRole(knex, SCHEMA_NAME, USER);

  await knex.schema.dropSchemaIfExists(SCHEMA_NAME);

  await dropUserIfExists(knex, USER);
}
