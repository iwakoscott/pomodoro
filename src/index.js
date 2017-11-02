import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function Title(props) {
  return (
    <div className="title-box container">
      <h1 className="main-title">ポモドーロ</h1>
      <h3 className="sub-title">[Pomodoro]</h3>
    </div>
  );
} // Renders title to page

class Timer
extends Component {

  timerSetUp(minutes) {

  } // sets up the timer

  renderTimer(minutes) {
    return (
      <h1 className="timer">{ () => {this.timerSetUp(minutes)} }</h1>
    );
  } // renders the time in minutes

  render() {
    return (
      <div>
        {this.renderTimer(this.props.minutes)}
      <div/>
    );
  }


}

class App
extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedSessionMinutes: 25,
      selectedBreakMinutes: 5,
      shownSessionMinutes: 25,
      shownBreakMinutes: 5,
      onSession: true,
    };
  }

  render(){
    return (
      <div>
        <Title />
        <Timer minutes={this.state.onSession ? this.state.shownSessionMinutes : this.state.shownBreakMinutes}/>
        <UpNext />
        <Tabs />
      </div>
    );
  }

} // Main application

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
