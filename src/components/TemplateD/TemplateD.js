import React from "react";

import "./TemplateD.scss";

class TemplateD extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      content: this.props.content
    };
  }

  render() {
    const { content } = this.state;

    return (
      <div className="templateD">
        <div className={"tileD tileD--bg_" + content.background}>
          <h3 className="tileD__title">{content.title}</h3>
          <div className="tileD__group">
            <a
              className={"tileD__btn tileD__btn--bgc_" + content.background}
              href=""
            >
              {content.link1}
            </a>
            <a className="tileD__btn" href="">
              {content.link2}
            </a>
          </div>
          <div className="tileD__icons">
            {content.icon.map((url, key) => {
              return (
                <img
                  key={key}
                  className="tileD__icon"
                  src={require("../../assets/images/recipes/icons/" + url)}
                  alt=""
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default TemplateD;
