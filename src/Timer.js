import React, { Component } from 'react';

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
      isOn: false,
      start: this.props.seconds,
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
  } // Temp

  tick(){
    this.setState({
      seconds: this.state.seconds - 1
    });
  } // Timer.tick

  reset(){
    clearInterval(this.state.timer);
    this.setState({
      seconds: this.state.start,
      isOn: false,
    });
  }

  render() {
    if (!this.state.seconds) {
      clearInterval(this.state.timer);
    }

    return (
      <div>
        <h1 onClick={this.handleClick}>{formatTime(this.state.seconds)}</h1>
        <button onClick={this.handleClick}>start</button>
        <button onClick={this.reset}>reset</button>
      </div>
    );
  } // Timer.render

} // Timer

export default Timer;
