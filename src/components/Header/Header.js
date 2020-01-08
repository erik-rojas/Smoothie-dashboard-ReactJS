import React from "react";
import { connect } from "react-redux";
import SVG from "react-inlinesvg";

import "./Header.scss";
import { logoutUser } from "../../actions/user";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      onMenuClicked: this.props.onClick
    }
  }

  doLogout = () => {
    this.props.dispatch(logoutUser());
  };

  render() {
    return (
      <div className="navbar">
        <div className="navbar-menu">
          <button className="btn-menu" onClick={this.state.onMenuClicked}>
            <SVG
              src={require("../../assets/images/navbar-mobile-menu-icon.svg")}
            />
          </button>
        </div>
        <div className="navbar-search">
          <SVG
            className="navbar-search-icon"
            src={require("../../assets/images/navbar-search-icon.svg")}
          />
          <div className="navbar-search-input">
            <input
              className="input-field"
              type="text"
              placeholder="Search growth experiment"
            />
          </div>
        </div>
        <div className="navbar-btn-section">
          <div className="btn-settings-section">
            <button className="btn-settings">
              <img src={require('../../assets/images/navbar-settings-icon.png')} alt="" />
            </button>
          </div>
          <div className="btn-user-section">
            <button className="btn-user">V</button>
          </div>
          <button className="btn-logout" onClick={() => this.doLogout()}>
            Log out
          </button>
        </div>
      </div>
    );
  }
}

export default connect()(Header);
