/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SVG from "react-inlinesvg";

import "./Experiments.scss";

import Template from "../../components/Template/Template";
import TemplateD from "../../components/TemplateD/TemplateD";
import Experiments_list from "./Experiments_list";

class Experiments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe_count: 0,
      recipe_list: [],
      recipe_fixStyle: "",
      recipe_toggleStyle: " recipe-closed",
      recipe_arrowStyle: " arrowUp",
      bRecipeOpened: false,
      approvedExpList: this.props.auth.approvedExpList
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  
  handleScroll = () => {
    if (window.scrollY >= 200) {
      this.setState({ recipe_fixStyle: " recipes-fixed" });
    } else {
      this.setState({ recipe_fixStyle: "" });
    }
  };

  onTemplateClicked = title => {
    var recipe_list = this.state.recipe_list.slice();

    var index = recipe_list.indexOf(title);
    if (index !== -1) {
      recipe_list.splice(index, 1);
    } else {
      recipe_list.push(title);
    }

    this.setState({ recipe_list: recipe_list });
  };

  onCollapse = () => {
    const { bRecipeOpened } = this.state;
    this.setState({ bRecipeOpened: !bRecipeOpened});
    var bOpened = !bRecipeOpened;

    if (bOpened) {
      this.setState({ recipe_toggleStyle: " recipe-opened", recipe_arrowStyle: " arrowDown" });
    } else {
      this.setState({ recipe_toggleStyle: " recipe-closed", recipe_arrowStyle: " arrowUp" });
    }
  }

  render() {
    const { approvedExpList, recipe_list, recipe_fixStyle, recipe_toggleStyle, recipe_arrowStyle } = this.state;
    const recipe_count = recipe_list.length;

    let recipe_output;

    if (approvedExpList.length > 0) {
      recipe_output = (
        <div className="list-section-content">
          {approvedExpList.map((prop, key) => {
            return (
              <Template
                onClick={() => this.onTemplateClicked(prop.content.title)}
                key={key}
                content={prop.content}
              />
            );
          })}
        </div>
      );
    } else {
      recipe_output = (
        <div className="blank">
          <img src={require("../../assets/images/blank-template.png")} alt="" />
        </div>
      );
    }
    return (
      <div className="experiment">
        <div className="experiment-approved">
          <div className="experiment-approved-content">
            <div className="welcome">
              <h1 className="text">Welcome to Smoothie !</h1>
            </div>
            <div className="list-section">
              <h4 className="text">
                You currently have{" "}
                <span className="number">{approvedExpList.length}</span> approved growth
                Experiments 😊{" "}
              </h4>
              {recipe_output}
            </div>
          </div>
          <div className={"experiment-approved-recipe" + recipe_toggleStyle}>
            <div className={"recipes" + recipe_fixStyle}>
              <span class={"recipes-chevron" + recipe_arrowStyle} onClick={() => this.onCollapse()}>
                <SVG
                  src={require("../../assets/images/arrow-down.svg")}
                />
              </span>
              <p className="recipes-hello">Hello 👋 !</p>
              <h5 className="recipes-title">
                You’ve selected <span className="number">({recipe_count})</span>{" "}
                growth experiments.
              </h5>
              <ul className="recipes-list add-scroll">
                {recipe_list.map((recipe, key) => {
                  return <li className="recipes-list-item" key={key}>{recipe}</li>;
                })}
              </ul>
              <p className="recipes-total">
                TOTAL : <span className="number">({recipe_count})</span>
              </p>
              <span className="recipes-separator" />
              <p className="recipes-success">Thank you ! 🥐</p>
              <form className="recipes-form">
                <button
                  type="button"
                  className="btn-checkout"
                  // onClick={() => this.handleRequest()}
                  disabled={recipe_count < 1}
                >
                  Checkout
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="experiment-all-list">
          <h1 className="text">Growth experiments</h1>
          <div className="list-content">
            {Experiments_list.map((prop, key) => {
              return <TemplateD key={key} content={prop.content} />;
            })}
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

export default withRouter(connect(mapStateToProps)(Experiments));
