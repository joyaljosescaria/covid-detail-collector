
exports.up = function(knex) {
    return knex.schema.createTable("visitors", tbl => {
        tbl.increments();
        tbl.string("name");
        tbl.string("place");
        tbl.string("phno");
        tbl.timestamp('created_at').defaultTo(knex.fn.now())
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("visitors");
};
