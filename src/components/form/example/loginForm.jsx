import React from "react";
import Form from "../form";

class LoginForm extends Form {  

  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = this.buildSchema(this.state.data);
  doSubmit = () => {
    console.log("Call the server");   
  };

  render() {
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
