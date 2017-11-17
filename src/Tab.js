import React, { Component } from 'react';
import './font-awesome-4.7.0/css/font-awesome.css';
import './index.css'

function formatTime(s) {
  var hours = Math.floor(s/3600);
  var minutes = Math.floor((s - hours*3600)/60);
  var seconds = s - minutes*60 - hours*3600;

  var hh = hours < 10 ? '0' + hours : hours;
  var mm = minutes < 10 ? '0' + minutes : minutes;
  var ss = seconds < 10 ? '0' + seconds : seconds;
  return hh > 0 ? hh + ' : ' + mm + ' : ' + ss : mm  + ' : ' + ss;
} // formatTime

function clearance(x){
  if (x > 60) {
    return x;
  } else {
    return 60;
  }
} // clearance

class Tab
extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: this.props.seconds
    };
  }

  sendUpdate(){
      this.props.toggleTabStatus(this.props.title);
      if (this.props.timerIsOn){
        this.props.forceStopTimer();
        this.props.updateTimerStatus(false);
        return false;
      }
      this.props.update(this.state.time, this.props.title);
  }

  render(){

    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 tab" style={this.props.style}>
        <h1 className="tab-header" onClick={ () => { this.sendUpdate() } }>{this.props.title}</h1>
        <h2 id="tab-time">{formatTime(this.state.time)}</h2>
        <button className="tab-button" onClick={() => {this.setState({time: this.state.time + 60})}}><i className="fa fa-plus-square"></i></button>
        <button className="tab-button" onClick={() => {this.setState({time: clearance(this.state.time - 60)})}}><i className="fa fa-minus-square"></i></button>
      </div>
    );
  }
} // Tab

export default Tab;
