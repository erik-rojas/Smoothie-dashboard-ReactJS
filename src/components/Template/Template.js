import React from "react";

import "./Template.scss";

class Template extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      content: this.props.content,
      onTemplateClicked: this.props.onClick,
      selected: false
    };
  }

  onClick = (e) => {
    const { selected } = this.state;
    this.setState({ selected: !selected });
    this.state.onTemplateClicked();
  };

  render() {
    const { content } = this.state;
    const { selected } = this.state;

    return (
      <div className="template" onClick={this.onClick}>
        <div className={"tile tile--bg_" + content.background + (selected ? " selected" : "")}>
          <h3 className="tile__title">{content.title}</h3>
          <div className="tile__group">
            <a
              className={"tile__btn tile__btn--bgc_" + content.background}
              href=""
            >
              {content.link1}
            </a>
            <a className="tile__btn" href="">
              {content.link2}
            </a>
          </div>
          <div className="tile__icons">
            {content.icon.map((url, key) => {
              return (
                <img
                  key={key}
                  className="tile__icon"
                  src={require("../../assets/images/recipes/icons/" + url)}
                  alt=""
                />
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Template;
