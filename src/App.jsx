import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./components/common/table/example/movies";
import Customers from "./components/navbar/example/customers";
import Rentals from "./components/navbar/example/rentals";
import NotFound from "./components/common/notFound";
import Navbar from "./components/navbar/navbar";
import "./App.css";
import MovieForm from './components/navbar/example/movieForm';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <main className="container">
        <Switch>
          {
          <Route path="/movies/:id" component={MovieForm} />
          /*Bu kisayolla 4 tane olusturabilirsin Route[path][component]*4 */}
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
