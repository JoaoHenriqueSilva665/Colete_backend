"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.createTable('point_items', table => {
        table.integer('point_id')
            .notNullable()
            .references('id')
            .inTable('points');
        table.integer("item_id")
            .notNullable()
            .references('id')
            .inTable('items');
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTable('point_items');
}
exports.down = down;
