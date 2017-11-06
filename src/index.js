import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Timer from './Timer';
import UpNext from './UpNext';
import Tab from './Tab';

function Title(props) {
  return (
    <div className="title-box container">
      <h1 className="main-title">[Pomodoro]</h1>
      <h1 className="main-title"><i className="em em-tomato"></i></h1>
    </div>
  );
} // Renders title to page

class App
extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sessionSeconds: 1500,
      breakSeconds: 300,
      selectedSessionSeconds: 1500,
      selectedBreakSeconds: 300,
      onSession: true,
    };

    this.handler = this.handler.bind(this);
  } // App.constructor

  handler(time, type){
    if (type === 'session'){
      this.setState({ sessionSeconds: time });
    } else {
      this.setState({ breakSeconds: time });
    }
  } // App.update

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
        <div className="container">
          <Tab title={"session"} seconds={this.state.selectedSessionSeconds} update={this.handler} />
          <Tab title={"break"} seconds={this.state.selectedBreakSeconds} update={this.handler} />
        </div>
      </div>
    );
  } // App.render

} // Main application

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
