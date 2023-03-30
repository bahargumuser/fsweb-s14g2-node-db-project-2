exports.up = function (knex) {
  // SİHRİNİZİ GÖSTERİN
  return knex.schema.createTable("cars", (tbl) => {
    tbl.increments(); //id diye bir kolon oluşturup 1er 1er artmasını sağlıyor
    tbl.string("vin").notNullable().unique();
    tbl.string("make").notNullable();
    tbl.string("model").notNullable();
    tbl.integer("milage").notNullable();
    tbl.string("title");
    tbl.string("transmission");
  });
};

exports.down = function (knex) {
  // SİHRİNİZİ GÖSTERİN
  knex.schema.dropTableIfExists("cars");
};
