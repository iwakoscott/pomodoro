import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Timer from './Timer';
import UpNext from './UpNext';
import Tab from './Tab';
import CurrentSession from './CurrentSession'
import './index.css'

//  <h1 className="main-title"><i className="em em-tomato"></i></h1>


function Title(props) {
  return (
    <div className="title-box container">
      <h1 className="main-title">[Pomodoro.]</h1>
      <CurrentSession onSession={props.onSession}/>
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
      timerIsOn: false,
      forceStop: false,
      sessionTabIsOpen: false,
      breakTabIsOpen: false,
    };

    this.handler = this.handler.bind(this);
    this.updateTimerStatus = this.updateTimerStatus.bind(this);
    this.forceStopTimer = this.forceStopTimer.bind(this);
    this.resetForceStop = this.resetForceStop.bind(this);
    this.switchSessions = this.switchSessions.bind(this);
    this.toggleTabStatus = this.toggleTabStatus.bind(this);
  } // App.constructor

  toggleTabStatus(type){
    if (type === "session") {
      this.setState({
        sessionTabIsOpen: !this.state.sessionTabIsOpen
      });
    }
    else {
      this.setState({
        breakTabIsOpen: !this.state.breakTabIsOpen
      });
    }
  }

  switchSessions(){
    this.setState({
      onSession: !this.state.onSession,
    });
  }

  updateTimerStatus(s){
    this.setState({
      timerIsOn: s
    });
  } // timerStatus

  handler(time, type){
    if (type === 'session'){
      this.setState({ sessionSeconds: time });
    } else {
      this.setState({ breakSeconds: time });
    }
  } // App.update

  forceStopTimer(){
    this.setState({
      forceStop: true,
    });
  } // App.forceStopTimer

  resetForceStop(){
    this.setState({
      forceStop: false,
    });
  } // App.resetForceStop

  render(){
    return (
      <div>
        <Title onSession={this.state.onSession}/>
        <Timer
          seconds={this.state.onSession ? this.state.sessionSeconds : this.state.breakSeconds}
          updateTimerStatus={this.updateTimerStatus}
          forceStop={this.state.forceStop}
          resetForceStop={this.resetForceStop}
          switchSessions={this.switchSessions}
          aTabIsOpen={this.sessionTabIsOpen || this.breakTabIsOpen}
        />
        <UpNext
          onSession={this.state.onSession}
          seconds={this.state.onSession ? this.state.breakSeconds : this.state.sessionSeconds}
        />
        <div className="container tabs">
          <Tab title={"session"}
               seconds={this.state.selectedSessionSeconds}
               update={this.handler}
               timerIsOn={this.state.timerIsOn}
               forceStopTimer={this.forceStopTimer}
               updateTimerStatus={this.updateTimerStatus}
               toggleTabStatus={this.toggleTabStatus}
               />
          <Tab title={"break"}
               seconds={this.state.selectedBreakSeconds}
               update={this.handler}
               timerIsOn={this.state.timerIsOn}
               forceStopTimer={this.forceStopTimer}
               updateTimerStatus={this.updateTimerStatus}
               toggleTabStatus={this.toggleTabStatus}
               />
        </div>
      </div>
    );
  } // App.render

} // Main application

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
