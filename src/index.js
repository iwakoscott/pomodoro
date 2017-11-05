import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Timer from './Timer'

function Title(props) {
  return (
    <div className="title-box container">
      <h1 className="main-title"><i className="em em-tomato"></i></h1>
      <h1 className="main-title">[Pomodoro]</h1>
    </div>
  );
} // Renders title to page

class App
extends Component {

  constructor(props) {
    super(props);
    this.state = {
      seconds: 420
    };
  } // App constructor

  render(){
    return (
      <div>
        <Title />
        <Timer seconds={this.state.seconds}/>
      </div>
    );
  } // App.render

} // Main application

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
