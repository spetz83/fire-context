import React, { Component } from "react";

import { withFirebase } from "../Firebase";
import { Grid, Header, Icon, Form, Segment, Button } from "semantic-ui-react";

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class PasswordChange extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;
    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { passwordOne, passwordTwo, error } = this.state;
    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

    return (
      <Grid
        textAlign="center"
        style={{ height: "100%" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="grey" textAlign="center">
            <Icon name="lock" size="large" /> Change Password
          </Header>
          <Form size="large" onSubmit={this.onSubmit}>
            <Segment stacked>
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
                Change Password
              </Button>
            </Segment>
            {error && <p>{error.message}</p>}
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withFirebase(PasswordChange);
