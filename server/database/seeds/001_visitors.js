
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('visitors').del()
    .then(function () {
      // Inserts seed entries
      return knex('visitors').insert([
        {
          name:"nizhal",
          place:"balal pattikad",
          phno:"111111111"
        },
        {
          name:"eruttu",
          place:"kalcr",
          phno:"000000000000000"
        },
      ]);
    });
};
