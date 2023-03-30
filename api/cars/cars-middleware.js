const carsModel = require("./cars-model");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  // HOKUS POKUS
  try {
    const isExistCar = await carsModel.getById(req.params.id);
    if (!isExistCar) {
      res
        .status(404)
        .json({ message: `${req.params.id} kimliğine sahip araba bulunamadı` });
    } else {
      req.currentCar = isExistCar;
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkCarPayload = (req, res, next) => {
  try {
    let fields = ["vin,make,model,milage"];
    let missedFields = [];
    for (let i = 0; i < fields.length; i++) {
      if (req.body[fields[i]] === undefined) {
        missedFields.push(fields[i]);
      }
    }
    if (missedFields.length > 0) {
      res
        .status(400)
        .json({ message: `${missedFields.toString()} alanları eksiktir.` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
  // HOKUS POKUS

  const checkVinNumberValid = (req, res, next) => {
    try {
      const isValidVin = vinValidator.validate(req.body.vin);
      if (!isValidVin) {
        res.status(400).json({ message: `vin ${req.body.vin} geçersizdir.` });
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
    // HOKUS POKUS
  };

  const checkVinNumberUnique = async (req, res, next) => {
    try {
      const isExistVinNumber = await carsModel.getbyVinNumber(req.body.vin);
      if (isExistVinNumber) {
        res.status(400).json({ message: `vin ${req.body.vin} zaten var` });
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
    // HOKUS POKUS
  };
  module.exports = {
    checkCarId,
    checkCarPayload,
    checkVinNumberUnique,
    checkVinNumberValid,
  };
};
