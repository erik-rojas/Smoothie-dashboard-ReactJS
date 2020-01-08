import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, withRouter, Link } from 'react-router-dom';

import "./Login.scss";
import { loginUser } from '../../actions/user';

class Login extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: ""
    };
  }

  changeLogin = (event) => {
    this.setState({login: event.target.value});
  }

  changePassword = (event) => {
    this.setState({password: event.target.value});
  }

  doLogin = (e) => {
    this.props.dispatch(
      loginUser({
        login: this.state.login,
        password: this.state.password,
      }),
    );
    e.preventDefault();
  };

  render() {
    const { auth } = this.props;
    
    if (auth.isAuthenticated) {
      return <Redirect to={{pathname: '/dashboard'}} />;
    }

    return (
      <div className="login">
        <div className="login-section">
          <div className="login-section-logo">
            <img
              src={require("../../assets/images/logo-croissant.png")}
              alt=""
            />
          </div>
          <div className="login-section-title">
            <h1>Login</h1>
          </div>
          <form className="login-section-form" onSubmit={this.doLogin}>
            <div className="input-email-section">
              <p>Email address</p>
              <input
                className="input-item"
                value={this.login}
                onChange={this.changeLogin}
                type="email"
                required
                name="username"
              />
            </div>
            <div className="input-password-section">
              <p>Password</p>
              <input
                className="input-item"
                value={this.password}
                onChange={this.changePassword}
                type="password"
                required
                name="password"
              />
            </div>
            <Link to="/create_password">Forgot your password ?</Link>
            <button className="btn-login">Login</button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default withRouter(connect(mapStateToProps)(Login));
