import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Login from "./login/Login";
import Password from "./password/Password";
import Dashboard from "./dashboard/Dashboard";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { redirect: props.location }
          }}
        />
      )
    }
  />
);

class App extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { auth } = this.props;

    return (
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/dashboard" />} />
        <PrivateRoute
          isAuthenticated={auth.isAuthenticated}
          path="/dashboard"
          component={Dashboard}
        />
        <Route path="/login" component={Login} />
        <Route path="/create_password" component={Password} />
      </Switch>
    );
  }
}

function mapStateToProps(store) {
  return {
    auth: store.auth
  };
}

export default withRouter(connect(mapStateToProps)(App));
