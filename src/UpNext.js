import React from 'react';
import './index.css'


function formatTime(s) {
  var hours = Math.floor(s/3600);
  var minutes = Math.floor((s - hours*3600)/60);

  return hours > 0 ? hours + ' hr and ' + minutes + ' minute' : minutes + ' minute';
} // formatTime

function UpNext(props) {
  var ending = props.onSession ? 'break' : 'session';
  var message = formatTime(props.seconds) + ' ' + ending;
  return (
    <div className="row">
      <h1 id="upNext">up next - {message}</h1>
    </div>
  );
} // UpNext

export default UpNext;
