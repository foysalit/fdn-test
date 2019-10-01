import React from 'react';
import logo from './logo.svg';

import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App__header">
        <img
          className="App__header-logo"
          src={logo}
          alt="Foundation"
        />
        Foundation
      </header>
      <div className="App__content">
        Please see README.md for your instructions.
      </div>
    </div>
  );
}

export default App;
