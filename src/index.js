import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Timer from './Timer';
import UpNext from './UpNext';

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
      sessionSeconds: 4230,
      breakSeconds: 2000,
      onSession: true,
    };
  } // App constructor

  render(){
    return (
      <div>
        <Title />
        <Timer
          seconds={this.state.onSession ? this.state.sessionSeconds : this.state.breakSeconds}
        />
        <UpNext
          onSession={this.state.onSession}
          seconds={this.state.onSession ? this.state.breakSeconds : this.state.sessionSeconds}
        />
      </div>
    );
  } // App.render

} // Main application

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
