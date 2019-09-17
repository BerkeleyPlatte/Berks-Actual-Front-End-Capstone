import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class NavBar extends Component {
  clearStorage = () => {
    localStorage.clear()
    sessionStorage.clear();
  };
  render() {
    return (
      <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
        <ul className="nav nav-pills nav-fill">
          <li className="nav-item">
            <Link className="nav-link" to="/foods">
              <h3>Macro Polo</h3>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/foods" />
          </li>
        </ul>

        <Link
          className="btn btn-primary btn-sm mr-3"
          onClick={this.clearStorage}
          to="/"
        >
          Logout
        </Link>
      </nav>
    );
  }
}

export default NavBar;
