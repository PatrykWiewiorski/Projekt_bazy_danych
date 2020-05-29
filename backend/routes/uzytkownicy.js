const router = require('express').Router(); //input
let Uzytkownik = require('../models/uzytkownik.model');

//pierwszy get od użytkownika
router.route('/').get((req, res) => {
  Uzytkownik.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json(err)); //zwraca error
});

// dodanie użytkownika
router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newUzytkownik = new Uzytkownik({username});

  // zapisanie użytkownika
  newUzytkownik.save()
    .then(() => res.json('Uzytkownik dodany')) // po zapisaniu zwraca komunikat
    .catch(err => res.status(400).json(err)); // w przeciwnym razie zwraca error
});

module.exports = router;