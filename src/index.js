import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Timer from './Timer';
import UpNext from './UpNext';
import Tab from './Tab';
import CurrentSession from './CurrentSession'
import './index.css'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


function Title(props) {
  return (
  <div>
    <div className="row my-name">
      <h1 id="sig">by Satoshi</h1>
    </div>
    <div className="title-box row">
      <h1 className="main-title">[pomodoro.]</h1>
      <CurrentSession onSession={props.onSession}/>
    </div>
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
      allowNotification: "Notification" in window ? Notification.requestPermission() : false,
    };

    this.handler = this.handler.bind(this);
    this.updateTimerStatus = this.updateTimerStatus.bind(this);
    this.forceStopTimer = this.forceStopTimer.bind(this);
    this.resetForceStop = this.resetForceStop.bind(this);
    this.switchSessions = this.switchSessions.bind(this);
    this.toggleTabStatus = this.toggleTabStatus.bind(this);
    this.notify = this.notify.bind(this);
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

  notify(){
    if (this.state.allowNotification){
      var options = {
        body: this.state.onSession ? 'Take a break. Drink some coffee. Breathe...' : 'Time to get some work done!',
        icon: this.state.onSession ? "https://www.emojibase.com/resources/img/emojis/hangouts/2615.png" : "https://www.emojibase.com/resources/img/emojis/apple/x1f345.png.pagespeed.ic.-BK-NQmV1t.png"
      };
      this.state.allowNotification.then(function(reg){
        var n = new Notification("Times up!", options);
      });
    }
  } // notify

  render(){
    return (
      <div className="container-fluid app">
        <Title onSession={this.state.onSession}/>
        <Timer
          seconds={this.state.onSession ? this.state.sessionSeconds : this.state.breakSeconds}
          updateTimerStatus={this.updateTimerStatus}
          forceStop={this.state.forceStop}
          resetForceStop={this.resetForceStop}
          switchSessions={this.switchSessions}
          aTabIsOpen={this.sessionTabIsOpen || this.breakTabIsOpen}
          notify={this.notify}
        />
        <UpNext
          onSession={this.state.onSession}
          seconds={this.state.onSession ? this.state.breakSeconds : this.state.sessionSeconds}
        />
        <div className="tabs row">

          <Tab title={"session"}
               seconds={this.state.selectedSessionSeconds}
               update={this.handler}
               timerIsOn={this.state.timerIsOn}
               forceStopTimer={this.forceStopTimer}
               updateTimerStatus={this.updateTimerStatus}
               toggleTabStatus={this.toggleTabStatus}
               style={{'background-color': 'DarkOrange'}}
               />
          <Tab title={"break"}
               seconds={this.state.selectedBreakSeconds}
               update={this.handler}
               timerIsOn={this.state.timerIsOn}
               forceStopTimer={this.forceStopTimer}
               updateTimerStatus={this.updateTimerStatus}
               toggleTabStatus={this.toggleTabStatus}
               style={{'background-color': 'Orange'}}
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
