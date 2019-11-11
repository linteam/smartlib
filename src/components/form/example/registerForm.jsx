import React from "react";
import Form from "../form";
import * as userService from "../../../services/userService";
//import { toast, ToastContainer } from 'react-toastify';
import auth from "../../../services/authService";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };

  schema = this.buildSchema(this.state.data);

  doSubmit = async () => {
    try {
      let { headers } = await userService.register(this.state.data);
      auth.loginWithJwt(headers["x-auth-token"]);
      //toast.success('User Saved');
      //this.props.history.push("/");
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register Form</h1>
        {/* <ToastContainer /> */}
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
