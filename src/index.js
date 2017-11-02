import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function Title(props) {
  return (
    <div className="top">
      <h1 className="main-title">ポモドーロ</h1>
      <h3 className="sub-title">[Pomodoro]</h3>
    </div>
  );
} // Renders title to page

class App
extends Component {

  render(){
    return;
  }

} // Main application

ReactDOM.render(
  <Title />,
  document.getElementById("root")
);
