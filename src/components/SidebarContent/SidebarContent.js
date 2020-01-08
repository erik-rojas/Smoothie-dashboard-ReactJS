import React from "react";
import { NavLink } from "react-router-dom";

import "./SidebarContent.scss";

import dashboardRoutes from "../../routes/dashboard";

class SidebarContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth
    };
  }
  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-logo">
          <a href="https://www.croissant.io">
            <img
              src={require("../../assets/images/logo-croissant.png")}
              alt=""
            />
          </a>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            {dashboardRoutes.map((prop, key) => {
              if (!prop.redirect)
                return (
                  <li key={key}>
                    <NavLink
                      to={prop.path}
                      className="nav-link"
                      activeClassName="selected"
                    >

                      <div className="selected-div"></div>
                      <div className="img-section">
                        <img src={prop.icon} alt="" />
                      </div>
                    </NavLink>
                  </li>
                );
              return null;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default SidebarContent;
