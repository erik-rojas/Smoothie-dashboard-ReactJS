import React from "react";
import Sidebar from "react-sidebar";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import "./Dashboard.scss";
import SidebarContent from "../../components/SidebarContent/SidebarContent";
import Header from "../../components/Header/Header";

import dashboardRoutes from "../../routes/dashboard";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      bMobileSideBarView: false
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    if (window.innerWidth <= 1024) {
      this.setState({ bMobileSideBarView: true });
    } else {
      this.setState({ bMobileSideBarView: false });
    }
  };

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  onMenuClicked = () => {
    this.setState({ sidebarOpen: true });
  }

  render() {
    const { bMobileSideBarView } = this.state;
    let output_sidebar;

    if (!bMobileSideBarView) {
      output_sidebar = (
        <SidebarContent />
      );
    } else {
      output_sidebar = (
        <Sidebar
          sidebar={<SidebarContent />}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{
            sidebar: {
              background: "white",
              width: 80
            }
          }}
        />
      )
    }
    return (
      <div className="main">
        {output_sidebar}
        <div className="content">
          <Header onClick={ () => this.onMenuClicked() }/>
          <main className="main-panel">
            <Switch>
              {dashboardRoutes.map((prop, key) => {
                if (prop.redirect)
                  return <Redirect from={prop.path} to={prop.to} key={key} />;
                return (
                  <Route
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                );
              })}
            </Switch>
          </main>
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
