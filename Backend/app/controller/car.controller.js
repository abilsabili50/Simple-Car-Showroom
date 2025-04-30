const Car = require("../model/car.model");
const mongoose = require("mongoose");
const Service = require("../model/service.model");

module.exports = {
  addCar: async (req, res) => {
    try {
      const { id, ...rest } = req.body;

      if (id && !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
          status: "fail",
          message: "Provided _id is not a valid ObjectId",
        });
      }

      const carId = id ? new mongoose.Types.ObjectId(id) : undefined;
      const newCar = new Car({ _id: carId, ...rest });

      await newCar.save();

      res.status(201).send({
        status: "success",
        message: "New car created successfully",
        data: newCar,
      });
    } catch (error) {
      handleError(res, error);
    }
  },

  getCars: async (req, res) => {
    try {
      const cars = await Car.find();
      res.send({
        status: "success",
        message: "Cars found",
        data: cars.length ? cars : [],
      });
    } catch (error) {
      handleError(res, error);
    }
  },

  getCarById: async (req, res) => {
    try {
      const carId = req.params.id;
      const car = await Car.findById(carId);

      if (!car) {
        return res.status(404).send({
          status: "fail",
          message: "Car not found",
        });
      }

      res.send({
        status: "success",
        message: "Car found",
        data: car,
      });
    } catch (error) {
      handleError(res, error);
    }
  },

  deleteCar: async (req, res) => {
    try {
      const carId = req.params.id;
      const car = await Car.findByIdAndDelete(carId);

      if (!car) {
        return res.status(404).send({
          status: "fail",
          message: "Car not found",
        });
      }

      res.send({
        status: "success",
        message: "Car deleted successfully",
      });
    } catch (error) {
      handleError(res, error);
    }
  },

  countHPP: async (req, res) => {
    try {
      const carId = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(carId)) {
        return res.status(400).send({
          status: "fail",
          message: "Invalid car ID",
        });
      }

      const car = await Car.findById(carId);

      if (!car) {
        return res.status(404).send({
          status: "fail",
          message: "Car not found",
        });
      }

      const totalBiayaService = await calculateTotalServiceCost(carId);
      const sukuBungaNominal = calculateSukuBungaNominal(car);
      const hpp = calculateHPP(car, sukuBungaNominal, totalBiayaService);

      res.send({
        status: "success",
        message: "HPP counted successfully",
        data: { hpp, totalBiayaService, sukuBungaNominal },
      });
    } catch (error) {
      handleError(res, error);
    }
  },
};

// Helper functions to avoid repetition

const handleError = (res, error) => {
  res.status(500).send({
    status: "fail",
    message: error.message || "Internal server error",
  });
};

const calculateTotalServiceCost = async (carId) => {
  const services = await Service.find({ carId });
  return services.reduce((acc, service) => acc + service.biaya, 0);
};

const calculateSukuBungaNominal = (car) => {
  return (car.sukuBunga || 0) / 100 * (car.pinjaman || 0);
};

const calculateHPP = (car, sukuBungaNominal, totalBiayaService) => {
  return parseFloat(car.hargaDasar || 0) + sukuBungaNominal + totalBiayaService;
};
