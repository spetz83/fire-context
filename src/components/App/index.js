import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import Navigation from "../Navigation";
import Landing from "../Landing";
import Account from "../Account";
import Admin from "../Admin";
import Home from "../Home";
import PasswordForget from "../PasswordForget";
import SignIn from "../SignIn";
import SignUp from "../SignUp";

import * as ROUTES from "../../constants/routes";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Router>
          <div>
            <Navigation />
            <hr />
            <Route exact path={ROUTES.LANDING} component={Landing} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
            <Route path={ROUTES.SIGN_IN} component={SignIn} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
            <Route path={ROUTES.HOME} component={Home} />
            <Route path={ROUTES.ACCOUNT} component={Account} />
            <Route path={ROUTES.ADMIN} component={Admin} />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;