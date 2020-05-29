import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

//import komponentów
import Navbar from "./components/navbar.component"
import ListaAktywnosci from "./components/lista-aktywnosci.component";
import EdycjaAktywnosci from "./components/edycja-aktywnosci.component";
import UtworzenieAktywnosci from "./components/utworzenie-aktywnosci.component";
import UtworzenieUzytkownika from "./components/utworzenie-uzytkownika.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={ListaAktywnosci} /> 
      <Route path="/edit/:id" component={EdycjaAktywnosci} />
      <Route path="/create" component={UtworzenieAktywnosci} />
      <Route path="/user" component={UtworzenieUzytkownika} />
      </div>
    </Router>
  );
}

export default App;
