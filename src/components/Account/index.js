import React, { Component } from "react";
import PasswordForget from "../PasswordForget";
import PasswordChange from "../PasswordChange";
import { withAuthorization, AuthUserContext } from "../Session";

class Account extends Component {
  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <main>
            <h1>Account: {authUser.email}</h1>
            <PasswordForget />
            <PasswordChange />
          </main>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Account);
