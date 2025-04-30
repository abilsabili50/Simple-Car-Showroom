const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    tanggal: { type: Date, required: true },
    deskripsi: { type: String, required: true },
    biaya: { type: Number, required: true },
    carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
});

module.exports = mongoose.model('Service', serviceSchema);