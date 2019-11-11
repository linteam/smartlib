import React from "react";
import auth from "../../services/authService";
import { Route,Redirect } from 'react-router-dom';

const ProtectedRoute = ({path, component: Component, render, ...rest}) => {
  return (
    <Route
      // path={path} bu restin icinde gelir zaten
      {...rest}
      render={props => {
        if (!auth.getCurrentUser()) return <Redirect to={
          {
            pathname: "/login",
            state: {
              from: props.location
            }
          }
        } />;
        else return Component ? <Component {...props} /> : render(props);
      }}
    ></Route>
  );
};

export default ProtectedRoute;
