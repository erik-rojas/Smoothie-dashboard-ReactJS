import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./Password.scss";
import { createPassword } from "../../actions/user";

class Password extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      confirm: "",
      bErrorMsg: false,
      bSuccess: false,
      msgContent: ""
    };
  }

  static propTypes = {
    history: PropTypes.object
  };

  componentWillReceiveProps(prevProps) {
    const { auth } = this.props;
    if (!auth.isPwdCreated && prevProps.auth.isPwdCreated) {
      this.setState({
        bErrorMsg: true,
        bSuccess: true,
        msgContent: "The password is created successfully."
      });
    }
  }

  changePassword = event => {
    this.setState({ password: event.target.value });
  };

  changeConfirm = event => {
    this.setState({ confirm: event.target.value });
  };

  doCreatePassword = e => {
    const { password, confirm } = this.state;
    if (password !== confirm) {
      this.setState({
        bErrorMsg: true,
        bSuccess: false,
        msgContent: "Those passwords didn't match. Try again."
      });
    } else if(password !== "") {
      this.props.dispatch(createPassword(password));
    }
  };

  doCancel = e => {
    const { history } = this.props;
    history.push("/login");
  };

  render() {
    let output_msg;
    const { bErrorMsg, bSuccess, msgContent } = this.state;

    if (bErrorMsg) {
      if (!bSuccess) {
        output_msg = <p className="msg content-error">{msgContent}</p>;
      } else {
        output_msg = <p className="msg content-success">{msgContent}</p>;
      }
    }
    return (
      <div className="password">
        <div className="password-section">
          <div className="password-section-logo">
            <img
              src={require("../../assets/images/logo-croissant.png")}
              alt=""
            />
          </div>
          <div className="password-section-title">
            <h1>Create password</h1>
          </div>
          <div className="password-section-form">
            <div className="new-section">
              <p>Choose password</p>
              <input
                className="input-item"
                value={this.password}
                onChange={this.changePassword}
                type="password"
                required
                name="password"
              />
            </div>
            <div className="confirm-section">
              <p>Confirm</p>
              <input
                className="input-item"
                value={this.confirm}
                onChange={this.changeConfirm}
                type="password"
                required
                name="confirm"
              />
            </div>
            {output_msg}
            <div className="btn-section">
              <button className="btn" onClick={this.doCreatePassword}>
                Set password
              </button>
              <button className="btn" onClick={this.doCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default withRouter(connect(mapStateToProps)(Password));
