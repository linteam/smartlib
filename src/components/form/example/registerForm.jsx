import React from "react";
import Form from "../form";

class RegisterForm extends Form {
   

  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };
  
  schema = this.buildSchema(this.state.data);

  doSubmit() {
    console.log("Call the server");
  }

  render() {
    return (
      <div>
        <h1>Register Form</h1>
        <form onSubmit={this.submitHandler}>
          {this.renderInput("username", "Username", { autoFocus: true })}
          {this.renderInput("password", "Password", { type: "password" })}
          {this.renderInput("name", "Name")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
