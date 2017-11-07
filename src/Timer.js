import React, { Component } from 'react';
import './index.css'


function formatTime(s) {
  var hours = Math.floor(s/3600);
  var minutes = Math.floor((s - hours*3600)/60);
  var seconds = s - minutes*60 - hours*3600;

  var hh = hours < 10 ? '0' + hours : hours;
  var mm = minutes < 10 ? '0' + minutes : minutes;
  var ss = seconds < 10 ? '0' + seconds : seconds;
  return hh > 0 ? hh + ' : ' + mm + ' : ' + ss : mm  + ' : ' + ss;
}

class Timer
extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      seconds: this.props.seconds,
      inMemory: this.props.seconds,
      isOn: false,
    };

    this.tick = this.tick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.reset = this.reset.bind(this);
  } // Timer.constructor

  handleClick(){
    if (!this.state.isOn){
      let timer = setInterval(this.tick, 1000);
      this.setState({
        timer,
        isOn: !this.state.isOn
      });
    } // if it is not running, run.
    else {
      clearInterval(this.state.timer);
      this.setState({
        isOn: !this.state.isOn
      });
    } // if already running, stop.
    this.props.updateTimerStatus(!this.state.isOn);
  } // Temp

  tick(){
    if (!this.state.seconds) {
      clearInterval(this.state.timer);
      this.setState({
        isOn: false,
        seconds: this.state.inMemory,
      });
      this.props.switchSessions();
      this.props.updateTimerStatus(false);
      return;
    }

    else if (this.props.forceStop) {
      this.props.resetForceStop();
      clearInterval(this.state.timer);
      this.setState({
        isOn: false,
      });
      this.props.updateTimerStatus(false);
      return;
    }

    this.setState({
      seconds: this.state.seconds - 1
    });
  } // Timer.tick

  reset(){
    clearInterval(this.state.timer);
    this.setState({
      seconds: this.props.seconds,
      isOn: false,
    });
    this.props.updateTimerStatus(!this.state.isOn);
  }

  componentWillReceiveProps(nextProps){
    if (!this.state.isOn && nextProps.seconds !== this.props.seconds){
      console.log('Time Updated!');
      this.setState({
        seconds: nextProps.seconds,
        inMemory: nextProps.seconds,
      });
    }
  }

  render() {
    var buttonValue = this.state.isOn ? 'stop' : 'start';

    return (
      <div>
        <h1 className="timer" onClick={this.handleClick}>{formatTime(this.state.seconds)}</h1>
        <div className="container timer-buttons">
          <button className="timer-button" onClick={this.handleClick}>{buttonValue}</button>
          <button className="timer-button" onClick={this.reset}>reset</button>
        </div>
      </div>
    );
  } // Timer.render

} // Timer

export default Timer;
