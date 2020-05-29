import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // link do róznych routów

export default class Navbar extends Component {

  // wszystkie komponenty muszą  coś renderować
  render() {
    return (
      <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
        <Link to="/" className="navbar-brand">Kalendarz aktywności</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
          <Link to="/" className="nav-link">Aktywności</Link>
          </li>
            <li className="navbar-item">
          <Link to="/create" className="nav-link">Utwórz nową aktywność</Link>
          </li>
             <li className="navbar-item">
          <Link to="/user" className="nav-link">Utwórz użytkownika</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}