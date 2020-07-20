import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Order', table => {
    table.increments('id').primary();
    table.integer('quantity').notNullable();
    table.float('value').notNullable();
    table
      .string('description', 300)
      .notNullable()
      .unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Order');
}
