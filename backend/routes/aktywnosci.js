const router = require('express').Router();
let Aktywnosc = require('../models/aktywnosc.model');

router.route('/').get((req, res) => {
  Aktywnosc.find()
    .then(aktywnosci => res.json(aktywnosci)) //szuka aktywnosci i zwraca jsona
    .catch(err => res.status(400).json(err));
});

// dodanie aktywnosci
router.route('/add').post((req, res) => {
  // przypisanie zmiennych
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newAktywnosc = new Aktywnosc({
    username,
    description,
    duration,
    date,
  });

  // zapisanie aktywności
  newAktywnosc.save()
  .then(() => res.json('Aktywność dodana'))
  .catch(err => res.status(400).json(err));
});

router.route('/:id').get((req, res) => {
  Aktywnosc.findById(req.params.id)
    .then(Aktywnosc => res.json(aktywnosc))
    .catch(err => res.status(400).json('Error: ' + err));
});

// usunięcie aktywności
router.route('/:id').delete((req, res) => {
  Aktywnosc.findByIdAndDelete(req.params.id)
    .then(() => res.json('Aktywnosc usunięta'))
    .catch(err => res.status(400).json(err));
});

// edycja aktywności
router.route('/update/:id').post((req, res) => {
  Aktywnosc.findById(req.params.id)
    .then(aktywnosc => {
      aktywnosc.username = req.body.username;
      aktywnosc.description = req.body.description;
      aktywnosc.duration = Number(req.body.duration);
      aktywnosc.date = Date.parse(req.body.date);

      aktywnosc.save()
        .then(() => res.json('Aktywność zaaktualizowana'))
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json(err));
});

module.exports = router;