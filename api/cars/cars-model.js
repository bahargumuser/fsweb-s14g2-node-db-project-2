const db = require("../../data/db-config");

const getAll = () => {
  // HOKUS POKUS
  return db("cars");
};

const getById = (id) => {
  // HOKUS POKUS
  return db("cars").where("id", id).first();
};
const getbyVinNumber = (vin) => {
  return db("cars").where("vin", vin).first();
};

const create = async (cars) => {
  let [id] = await db("cars").insert(cars);
  return await getById(id);
  // HOKUS POKUS
};
module.exports = {
  getAll,
  getById,
  create,
  getbyVinNumber,
};
