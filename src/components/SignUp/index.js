import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";

import * as ROUTES from "../../constants/routes";
import {
  Message,
  Grid,
  Header,
  Icon,
  Form,
  Segment,
  Button
} from "semantic-ui-react";

const SignUp = () => (
  <main>
    <SignUpForm />
  </main>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        let data = { username: username, email: email };
        return this.props.firebase.createUser(authUser.user.uid, data);
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <Grid
        textAlign="center"
        style={{ height: "100%" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="grey" textAlign="center">
            <Icon name="signup" size="large" /> Sign Up
          </Header>
          <Form size="large" onSubmit={this.onSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Full Name"
                name="username"
                value={username}
                onChange={this.onChange}
              />
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="Email"
                name="email"
                value={email}
                onChange={this.onChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Confirm Password"
                type="password"
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
              />
              <Button color="green" fluid size="large" disabled={isInvalid}>
                Sign Up
              </Button>
            </Segment>
            {error && <p>{error.message}</p>}
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

const SignUpLink = () => (
  <Message>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </Message>
);

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);

export default SignUp;
export { SignUpForm, SignUpLink };
