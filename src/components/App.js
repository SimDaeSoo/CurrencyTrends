import React from 'react';
import Currencies from './Currencies';
import Chat from './Chat';
import News from './News';
import API from './API';
import '../styles/App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="main_wrapper">
          <Currencies />
          <Chat />
        </div>
        <News />
        <API />
      </div>
    );
  }
}

export default App;