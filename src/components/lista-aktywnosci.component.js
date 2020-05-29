import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// komponent Aktywnosc zaimplementowany jako funkcjonalny reactowy komponent
const Aktywnosc = props => (
  <tr>
    <td>{props.aktywnosc.username}</td>
    <td>{props.aktywnosc.description}</td>
    <td>{props.aktywnosc.duration}</td>
    <td>{props.aktywnosc.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.aktywnosc._id}>edytuj</Link>| <a href="@" onClick={() => { props.usunAktywnosc(props.aktywnosc._id) }}>Usuń</a>
    </td> 
  </tr>// link użyty z react-router-dom, ładuje kolejny komponent na stronie
)

// komponent ListaAktywnosci zaimplementowany jako class component
export default class ListaAktywnosci extends Component {
  constructor(props) {
    super(props);

    this.usunAktywnosc = this.usunAktywnosc.bind(this)

    this.state = {aktywnosci: []};
  }

  // lista aktywnosci z bazy danych
  componentDidMount() {
    axios.get('http://localhost:5000/aktywnosci/')
    // zbieramy wszystkie dane z aktywnosci i wrzucamy w aktywnosci: response.data
      .then(response => {
        this.setState({ aktywnosci: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }
 // pozwala użytkownikowi usunąć aktywność
  usunAktywnosc(id) {
    axios.delete('http://localhost:5000/aktywnosci/'+id)
    //axios wyciąga z backendu komunikat o usunięciu
      .then(response => { console.log(response.data)});

      // filtruje i update'uje wartość wyświetlaną użytkownikowi
    this.setState({
      aktywnosci: this.state.aktywnosci.filter(el => el._id !== id)
    })
  }

  // .map zwraca coś dla każdego elementu w tablicy.
  // Każdy element currentaktywnosc zwraca komponent
  aktywnoscLista() {
    return this.state.aktywnosci.map(currentaktywnosc => {
      return <Aktywnosc aktywnosci={currentaktywnosc} usunAktywnosc={this.usunAktywnosc} key={currentaktywnosc._id}/>;
    })
  }
  // render aktywnosci
  render() {
    return (
      <div>
        <h3>Zapisane aktywności</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Użytkownik</th>
              <th>Rodzaj aktywności</th>
              <th>Czas trwania</th>
              <th>Data</th>
              <th>Akcja</th>
            </tr>
          </thead>
          <tbody>
            { this.aktywnoscLista() }
          </tbody>
        </table>
      </div>
    )
  }
}