import React, { Component } from 'react';
import axios from 'axios';

export default class UtworzUzytkownika extends Component {
  constructor(props) {
    // definicja konstruktora podklasy
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // do bazy danych
    this.state = {
      username: ''
    }
  }
  // Status textboxa
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }
  // zatwierdzenie i dodanie do bazy
  onSubmit(e) {
    e.preventDefault();

    const uzytkownik = {
      username: this.state.username
    }

    console.log(uzytkownik);

    // połącznie z backendem
    // wysyłanie danych z użytkownika do backendu za pomocą axiosa
    axios.post('http://localhost:5000/uzytkownicy/add', uzytkownik)
    //kiedy pójdzie post wykonuje http request
      .then(res => console.log(res.data));

    this.setState({
      username: ''
    })
  }

  render() {
    return (
      // formularz na dodanie użytkownika
      <div>
        <h3>Utworz nowego użytkownika</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Nazwa: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Utwórz użytkownika" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}