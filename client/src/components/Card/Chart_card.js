import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";

export class Chart_card extends Component {
  render() {
    return (
      <div style={{ width:'19rem',margin:'1rem'}} className={"issue-card card" + (this.props.plain ? " card-plain" : "")}>
        <div style={{padding:'10px',textAlign:'center'}} className={"header" + (this.props.hCenter ? " text-center" : "")}>
          <h4 style={{color:'rgb(252, 138, 62) ',fontWeight:'400'}} className="title"><FontAwesomeIcon style={{marginRight:'.5rem'}} icon={this.props.icon}/>{this.props.title}</h4>
          <p className="category">{this.props.category}</p>
        </div>
        <div style={{padding:'10px',textAlign:'center'}}
          className={
            "content" +
            (this.props.ctAllIcons ? " all-icons" : "") +
            (this.props.ctTableFullWidth ? " table-full-width" : "") +
            (this.props.ctTableResponsive ? " table-responsive" : "") +
            (this.props.ctTableUpgrade ? " table-upgrade" : "")
          }
        >
          {this.props.content}

          <div className="footer">
            {this.props.legend}
            {this.props.stats != null ? <hr /> : ""}
            <div className="stats">
              <i className={this.props.statsIcon} /> {this.props.stats}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chart_card;
