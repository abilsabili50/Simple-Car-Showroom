const express = require('express');
const {addService, getServicesByCarId, deleteService} = require('../controller/service.controller');
const router = express.Router();

// Tambah Service
router.post('', addService);

// Tampilkan Semua Services
router.get('/car/:carId', getServicesByCarId);

// Hapus Service
router.delete('/:id', deleteService);

module.exports = router;