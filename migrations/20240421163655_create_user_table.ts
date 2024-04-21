import type { Knex } from 'knex';

import { addTimestampColumns } from '../knex-utils';

const SCHEMA_NAME = 'api_demo';
const TABLE_NAME = 'user';

export async function up(knex: Knex): Promise<void> {
  const schemaBuilder = knex.schema.withSchema(SCHEMA_NAME);
  const isTableExist = await schemaBuilder.hasTable(TABLE_NAME);

  if (isTableExist) {
    return;
  }
  await schemaBuilder.createTable(TABLE_NAME, (table) => {
    table.string('id').primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable();
    table.integer('coin').notNullable().defaultTo(0);
    table.string('password').notNullable();
    table.unique(['email']);

    addTimestampColumns(table);
  });
}

export async function down(knex: Knex): Promise<void> {
  const schemaBuilder = knex.schema.withSchema(SCHEMA_NAME);
  const isTableExist = await schemaBuilder.hasTable(TABLE_NAME);
  if (isTableExist) {
    await schemaBuilder.dropTable(TABLE_NAME);
  }
}
