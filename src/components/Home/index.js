import React, { Component } from "react";

import { withAuthorization } from "../Session";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);
