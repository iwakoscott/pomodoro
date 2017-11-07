import React from 'react';

function CurrentSession(props){

  const status = props.onSession ? 'session' : 'break';

  return (
    <h1 className="current-session">on {status}.</h1>
  );
}

export default CurrentSession;
