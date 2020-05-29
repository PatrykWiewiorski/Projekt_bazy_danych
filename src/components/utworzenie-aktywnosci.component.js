import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class UtworzenieAktywnosci extends Component {
  constructor(props) {
    //definicja konstruktora podklasy
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // część do bazy danych
    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      uzytkownicy: []
    }
  }
// użytkownik nie zobaczy stanu pośredniego gdy będzie wywoływany render (componentDidMount)
  componentDidMount() {
    axios.get('http://localhost:5000/uzytkownicy/')
    // sprawdza czy w bazie jest conajmniej jeden uzytkownik
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            uzytkownicy: response.data.map(uzytkownik => uzytkownik.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }
  // ustawia status który wpisze się w textbox
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }
  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }
  onChangeDate(date) {
    this.setState({
      date: date
    })
  }
 // Zatwierdzenie wypełnionych pól i dodanie do bazy
  onSubmit(e) {
    e.preventDefault();

    const aktywnosc = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(aktywnosc);

    //wysylanie danych z aktywnosci do backendu za pomoca axiosa
    axios.post('http://localhost:5000/aktywnosci/add', aktywnosc)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
      //ciało formularza
      <div>
      <h3>Utwórz nową aktywność</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 

          <label>Uzytkownik: </label>
          <select ref="userInput" //dropdown menu dla użytkowników
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                // .map pozwala na zwrócenie czegoś dla każdego elementu z tablicy
                this.state.uzytkownicy.map(function(uzytkownik) { 
                  //dla każdego użytkownika w tablicy zwraca klucz i wartość
                  return <option 
                    key={uzytkownik}
                    value={uzytkownik}>{uzytkownik}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Rodzaj aktywności: </label>
          <input  type="text"
              required
              // formularze tworzenia aktywności
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Czas trwania (w minutach): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Data: </label>
          <div>
            <DatePicker // instalacja paczki npm install react-datepicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Utwórz" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}