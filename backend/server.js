const express = require('express');
// cors - aplikacja działająca na jednym źródle daje dostęp do wybranych zasobów z innego źródła
const cors = require('cors'); 
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.port || 3000;  // numer portu

app.use(cors());

app.use(express.json());

const uri = process.env.ATLAS_URI;  // miejsce łączenia z bazą
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Połączono z bazą danych") //Wyświetla komunikat po połączeniu z bazą
})

// import routów
const aktywnosciRouter = require('./routes/aktywnosci'); 
const uzytkownicyRouter = require('./routes/uzytkownicy');

// obsługa routów
app.use('/aktywnosci', aktywnosciRouter);
app.use('/uzytkownicy', uzytkownicyRouter);

// uruchomienie servera na porcie
server.listen(port)   