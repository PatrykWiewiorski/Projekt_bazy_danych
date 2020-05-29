const mongoose = require('mongoose');

// utworzenie modelu użytkownika

const Schema = mongoose.Schema; // potrzeba mongoosa do zapisania danych

const uzytkownikSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, //spacje
    minlength: 2 // min. dł
  },
}, {
  timestamps: true,
});

const Uzytkownik = mongoose.model('Uzytkownik', uzytkownikSchema);

module.exports = Uzytkownik;