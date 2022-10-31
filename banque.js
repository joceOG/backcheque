const mongoose = require('mongoose');

const banqueSchema = mongoose.Schema({
    nomBanque: { type: String, required: true },
    localite: { type: String, required: true },
});

module.exports = mongoose.model('Banque', banqueSchema);