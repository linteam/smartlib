import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Movies from "./components/table/example/movies";
import Customers from "./components/navbar/example/customers";
import Rentals from "./components/navbar/example/rentals";
import NotFound from "./components/common/notFound";
import Navbar from "./components/navbar/navbar";
import MovieForm from "./components/form/example/movieForm";
import LoginForm from "./components/form/example/loginForm";
import RegisterForm from "./components/form/example/registerForm";
import ProtectedRoute from './components/common/protectedRoute';

import HttpExample from "./services/example/httpExample";
import Logout from './components/table/example/logout';
// import auth from "./services/authService";
import "./App.css";

class App extends Component {
  state = {};

  // componentDidMount() {   
  //   this.setState({ user: auth.getCurrentUser() });
  // }

  render() {
    const {user} = this.state;
    return (
      <React.Fragment>
        <Navbar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm}></Route>  
            <Route path="/login" component={LoginForm}></Route>
            <ProtectedRoute path="/movies/:id" component={MovieForm}/>
            {/* <Route path="/movies" render={props => <Movies {...props} user={user}/>}></Route> */}
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/logout" component={Logout}/>
            <Route path="/not-found" component={NotFound}></Route>
            <Route path="/http-example" component={HttpExample}></Route>
            <Redirect exact from="/" to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
 