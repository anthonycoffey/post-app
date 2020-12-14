import React from "react";
import CoursePage from "./CoursePage";

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

    render(){
      return (
        <div className="player-wrapper">
          <h1>
            {this.props.data.course}: {this.props.data.module}
          </h1>
          <p>page number: {this.state.count + 1}</p>
          <CoursePage
            key={this.state.count}
            page={this.props.data.pages[this.state.count]}
          />
        </div>
      )
    }

};

export default Player;
