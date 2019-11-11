import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ user }) => {

  let getName = () => {
    let name = user.name;
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="#">
        Bootstrap Navbar
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="navbar-nav">
          <NavLink className="nav-link" to="/movies">
            Movies
          </NavLink>

          <NavLink className="nav-link" to="/customers">
            Customers
          </NavLink>

          <NavLink className="nav-link" to="/rentals">
            Rentals
          </NavLink>

          <NavLink className="nav-link" to="/http-example">
            Http Example
          </NavLink>

          {!user && (
            <React.Fragment>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>

              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}

          {user && (
            <React.Fragment>
              <NavLink className="nav-link" to="/profile">
                {getName()}
              </NavLink>

              <NavLink className="nav-link" to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
