import React from "react";
import Form from "../form";
import auth from "../../../services/authService";
import { Redirect } from 'react-router-dom';

class LoginForm extends Form {  

  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = this.buildSchema(this.state.data);
  doSubmit = async () => {
    try {
        const {username: email, password} = this.state.data;
        let status = await auth.login(email, password);
        if(status === 200){                
          //this.props.history.replace("/");
          let {state} = this.props.location;
          window.location = state ? state.from.pathname : "/";
        }
      } catch (ex) {
         if(ex.response && ex.response.status === 400){
           const errors = {...this.state.errors};
           errors.username = ex.response.data;
           this.setState({errors});
         }
      }      
  };

  render() {
    if(auth.getCurrentUser()){
      return <Redirect to="/" />
    }
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.submitHandler}>
          {this.renderInput("username", "Username", {autoFocus: true})}
          {this.renderInput("password", "Password", {type:'password'})}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
