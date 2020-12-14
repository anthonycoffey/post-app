import React from "react";

class CoursePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.page.title
    };
  }
  render() {
    console.log(this.props);
    return (
      <div className="bg-blue-500">
        <h3>
          {this.state.title}
        </h3>
      </div>
    );
  }

}

export default CoursePage;
