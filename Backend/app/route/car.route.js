const express = require('express');
const {addCar, getCars, getCarById, deleteCar, countHPP} = require('../controller/car.controller');
const router = express.Router();

// Tambah Mobil
router.post('', addCar);

// Tampilkan Semua Mobil
router.get('', getCars);

// Tampilkan Detail Mobil
router.get('/:id', getCarById);

// Hapus Mobil
router.delete("/:id", deleteCar);

// Hitung HPP
router.get("/hpp/:id", countHPP);

module.exports = router;