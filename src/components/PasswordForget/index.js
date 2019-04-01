import React, { Component } from "react";

import * as ROUTES from "../../constants/routes";
import {
  Grid,
  Header,
  Icon,
  Form,
  Segment,
  Button,
  Message
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { withFirebase } from "../Firebase";

const PasswordForget = () => (
  <div>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: "",
  error: null
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;
    const isInvalid = email === "";

    return (
      <Grid
        textAlign="center"
        style={{ height: "100%" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="grey" textAlign="center">
            <Icon name="question circle" size="large" /> Forgot Password
          </Header>
          <Form size="large" onSubmit={this.onSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={this.onChange}
              />
              <Button color="green" fluid size="large" disabled={isInvalid}>
                Reset Password
              </Button>
            </Segment>
            {error && <p>{error.message}</p>}
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

const PasswordForgetLink = () => (
  <Message>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </Message>
);

export default PasswordForget;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
