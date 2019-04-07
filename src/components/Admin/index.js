import React, { Component } from "react";
import { withFirebase } from "../Firebase";

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase
      .getUserRef()
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let user = { id: doc.id };
          user = { ...user, ...doc.data() };
          let users = this.state.users;
          users.push(user);
          this.setState({ users: users });
        });
      })
      .then(() => {
        this.setState({ loading: false });
        console.log(this.state);
      });
  }

  render() {
    return (
      <div>
        <h1>Admin</h1>
      </div>
    );
  }
}

export default withFirebase(Admin);
