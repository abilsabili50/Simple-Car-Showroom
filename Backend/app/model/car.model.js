const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: false
    },
    merk: { type: String, required: true },
    model: { type: String, required: true },
    tahun: { type: Number, required: true },
    hargaDasar: { type: Number, required: true },

    // Tambahan opsional:
    pinjaman: { type: Number, default: 0 },
    sukuBunga: { type: Number, default: 0 }, // dalam persen
});

carSchema.pre("save", function(next){
    if(!this._id){
        this._id = new mongoose.Types.ObjectId();
    }
    next();
})

module.exports = mongoose.model('Car', carSchema);
