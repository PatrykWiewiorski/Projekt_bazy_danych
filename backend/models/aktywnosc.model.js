const mongoose = require('mongoose');

// utworzenie modelu aktywności

const Schema = mongoose.Schema;

const aktywnoscSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Aktywnosc = mongoose.model('Aktywnosc', aktywnoscSchema);

module.exports = Aktywnosc;