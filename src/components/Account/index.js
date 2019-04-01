import React, { Component } from "react";
import PasswordForget from "../PasswordForget";
import PasswordChange from "../PasswordChange";

class Account extends Component {
  render() {
    return (
      <main>
        <h1>Account</h1>
        <PasswordForget />
        <PasswordChange />
      </main>
    );
  }
}

export default Account;
