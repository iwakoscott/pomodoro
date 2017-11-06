import React, { Component } from 'react';
import './font-awesome-4.7.0/css/font-awesome.css';

function formatTime(s) {
  var hours = Math.floor(s/3600);
  var minutes = Math.floor((s - hours*3600)/60);
  var seconds = s - minutes*60 - hours*3600;

  var hh = hours < 10 ? '0' + hours : hours;
  var mm = minutes < 10 ? '0' + minutes : minutes;
  var ss = seconds < 10 ? '0' + seconds : seconds;
  return hh > 0 ? hh + ' : ' + mm + ' : ' + ss : mm  + ' : ' + ss;
} // formatTime

class Tab
extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: this.props.seconds
    };
  }

  render(){

    return (
      <div className="container">
        <h1 onClick={ () => { this.props.update(this.state.time, this.props.title)} }>{this.props.title}</h1>
        <h2>{formatTime(this.state.time)}</h2>
        <button onClick={() => {this.setState({time: this.state.time + 60})}}><i className="fa fa-plus-square"></i></button>
        <button onClick={() => {this.setState({time: this.state.time - 60})}}><i className="fa fa-minus-square"></i></button>
      </div>
    );
  }
} // Tab

export default Tab;