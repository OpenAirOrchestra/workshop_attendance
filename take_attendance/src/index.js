import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function AttendApp() {
  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}

// ========================================


ReactDOM.render(
  <AttendApp />,
  document.getElementById('root')
);
