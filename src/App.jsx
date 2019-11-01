import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./components/table/example/movies";
import Customers from "./components/navbar/example/customers";
import Rentals from "./components/navbar/example/rentals";
import NotFound from "./components/common/notFound";
import Navbar from "./components/navbar/navbar";
import MovieForm from './components/navbar/example/movieForm';
import LoginForm from './components/form/example/loginForm';
import "./App.css";
import RegisterForm from './components/form/example/registerForm';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <main className="container">
        <Switch>
          <Route path="/register" component={RegisterForm}></Route>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/movies/:id" component={MovieForm}></Route>
          <Route path="/movies" component={Movies}></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect exact from="/" to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
